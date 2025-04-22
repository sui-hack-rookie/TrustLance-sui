import {
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// Create a new contract document in Firestore
export async function createContract(userId, role) {
  try {
    // Create a reference to a new document with auto-generated ID
    const contractsRef = collection(db, "contracts");
    const newContractRef = doc(contractsRef);

    // Determine the roles
    const creatorRole = role;
    const partnerRole = role === "client" ? "freelancer" : "client";

    // Create the contract data
    const contractData = {
      createdAt: new Date(),
      createdBy: userId,
      status: "pending", // pending, active, completed, cancelled
      [creatorRole]: {
        userId,
        joined: true,
      },
      [partnerRole]: {
        userId: null,
        joined: false,
      },
      terms: {
        title: "",
        description: "",
        rate: "",
        dueDate: null,
      },
    };

    // Save the document
    await setDoc(newContractRef, contractData);

    // Return the document ID
    return newContractRef.id;
  } catch (error) {
    console.error("Error creating contract:", error);
    throw error;
  }
}

// Get a contract by ID
export async function getContract(contractId) {
  try {
    const contractRef = doc(db, "contracts", contractId);
    const contractSnap = await getDoc(contractRef);

    if (contractSnap.exists()) {
      return { id: contractSnap.id, ...contractSnap.data() };
    } else {
      throw new Error("Contract not found");
    }
  } catch (error) {
    console.error("Error getting contract:", error);
    throw error;
  }
}

// Join a contract as the partner
export async function joinContract(contractId, userId, role) {
  try {
    const contractRef = doc(db, "contracts", contractId);
    const contractSnap = await getDoc(contractRef);

    if (!contractSnap.exists()) {
      throw new Error("Contract not found");
    }

    const contractData = contractSnap.data();

    // Check if this role is already filled
    if (contractData[role]?.joined) {
      throw new Error(`This contract already has a ${role}`);
    }

    // Update the contract with the partner info
    await setDoc(
      contractRef,
      {
        ...contractData,
        [role]: {
          userId,
          joined: true,
        },
        status:
          contractData.client?.joined && contractData.freelancer?.joined
            ? "active"
            : "pending",
      },
      { merge: true },
    );

    return contractId;
  } catch (error) {
    console.error("Error joining contract:", error);
    throw error;
  }
}

// Get All contracts of a user
export async function getAllContracts(userId) {
  try {
    const contractsRef = collection(db, "contracts");
    const q = query(
      contractsRef,
      or(
        where("client.userId", "==", userId),
        where("freelancer.userId", "==", userId),
      ),
    );

    const querySnapshot = await getDocs(q);
    const contracts = [];

    querySnapshot.forEach((doc) => {
      contracts.push({ id: doc.id, ...doc.data() });
    });

    return contracts;
  } catch (error) {
    console.error("Error getting contract:", error);
    throw error;
  }
}
