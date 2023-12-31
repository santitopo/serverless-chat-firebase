import { getFirestore, collection, getDocs } from "firebase/firestore";

export const getDocsToArray = async (collectionName) => {
  const db = getFirestore();

  const collectionRef = collection(db, collectionName);

  const querySnapshot = await getDocs(collectionRef);
  const documents = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    documents.push({ id: doc.id, ...data });
  });

  return documents;
};

export default getDocsToArray;
