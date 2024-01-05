import {
  addDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { IUser, IWork, Work } from "../model";
import { db, workRef } from "../util/firebase";

export const createWork = async (work: IWork) => {
  let lastID = await getLastId();
  const docWorkRef = await addDoc(workRef, {
    name: work.name,
    description: work.description,
    amount: work.amount,
    start: work.start,
    finish: work.finish,
    state: work.state,
    isActive: work.isActive,
    freelancer: "",
    id: ++lastID,
  });
  const docFreelancerRef = doc(db, "FreelancerList", docWorkRef.id);
  await setDoc(docFreelancerRef, {
    freelancers: [""],
  });
  return docWorkRef.id;
};

export const getWorksData = async (page: number) => {
  const works: IWork[] = [];
  const q = query(
    workRef,
    orderBy("id"),
    limit(10),
    startAfter(10 * (page - 1))
  );
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    works.push(new Work({ ...doc.data(), workId: doc.id }));
  });
  return works;
};

export const getLastId = async () => {
  let lastID = 0;
  const q = query(workRef, orderBy("id", "desc"), limit(1));
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    const lastWork = doc.data();
    console.log(lastWork.id);
    lastID = lastWork.id;
  });
  return lastID;
};

export const setAvailableWork = async (
  userId: string,
  availableWorks: string[]
) => {
  const docRef = doc(db, "User", userId);
  await updateDoc(docRef, { availableWorks: availableWorks });
};

export const getAvailableWorkDatas = async (
  availableWorksID: string[],
  page: number
) => {
  const workList: IWork[] = [];
  for (
    let index = (page - 1) * 10;
    index < availableWorksID.length && index < page * 10;
    index++
  ) {
    const docSnap = await getDoc(doc(db, "Work", availableWorksID[index]));
    const work = docSnap.data();
    if (work) {
      workList.push(new Work({ ...work, workId: docSnap.id }));
    }
  }
  return workList;
};

export const getWorkData = async (workId: string) => {
  const docSnap = await getDoc(doc(db, "Work", workId));
  const work = docSnap.data();
  if (work) {
    return new Work({ ...work, workId: workId });
  }
};

export const updateWorkData = async (work: IWork) => {
  const docRef = doc(db, "Work", work.workId);
  if (work.freelancer !== undefined) {
    await updateDoc(docRef, {
      name: work.name,
      description: work.description,
      amount: work.amount,
      start: work.start,
      finish: work.finish,
      state: work.state,
      isActive: work.isActive,
      freelancer: {
        id: work.freelancer.id,
        firstName: work.freelancer.firstName,
        lastName: work.freelancer.lastName,
        email: work.freelancer.email,
      },
    });
  }
};
export const getFreelancerListData = async (workId: string) => {
  const docSnap = await getDoc(doc(db, "FreelancerList", workId));
  const data = docSnap.data();
  if (data !== undefined) {
    return data.freelancers;
  }
};

export const setFreelancerListData = async (workId: string, user: IUser) => {
  const freelancerList = await getFreelancerListData(workId);
  const docRef = doc(db, "FreelancerList", workId);
  if (freelancerList.includes("")) {
    await setDoc(docRef, {
      freelancers: [
        {
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      ],
    });
  } else if (freelancerList !== undefined) {
    await updateDoc(docRef, {
      freelancers: [
        ...freelancerList,
        {
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      ],
    });
  }
};

export const getWorksCount = async () => {
  const snapshot = await getCountFromServer(workRef);
  return snapshot.data().count;
};

export const payMoney = async (
  freelancerId: string | undefined,
  client: IUser,
  amount: number
) => {
  if (freelancerId !== undefined) {
    const docSnap = await getDoc(doc(db, "User", freelancerId));
    const freelancer = docSnap.data();
    console.log(freelancerId);
    if (freelancer !== undefined) {
      const docFreelancerRef = doc(db, "User", freelancerId);
      await updateDoc(docFreelancerRef, {
        balance: freelancer.balance + amount,
      });
      const docClientRef = doc(db, "User", client.userId);
      await updateDoc(docClientRef, {
        balance: client.balance - amount,
      });
    }
  }
};
