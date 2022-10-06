const firebase = require("@firebase/testing");
const { beforeEach, before } = require("mocha");

const MY_PROJECT_ID = "chat-serverless-89e6b";


function getFirestore(auth) {
    return firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

const userDoc = {
    email: "auth@example.com",
    name: "name",
    profilePicture: "https://testImage.com", 
    uid: "asdf1234"
}

const myUser = {
    email: "john@example.com",
    name: "john",
    profilePicture: "https://testImage.com",
    uid: "1234asdf"
}

const myAuth = { uid: myUser.uid, email: myUser.email };

describe("All collections entry", () => {
    it("Cannot read items from any collection if not logged in", async () => {
        const db = getFirestore(null);
        const testDoc = db.collection("test").doc("testDoc");
        await firebase.assertFails(testDoc.get());
    });
});

describe("User entry", () => {
  it("Cannot read items from times user collection if not authenticated", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("users").doc("testDoc");
    await firebase.assertFails(testDoc.get());
  });

  it("Can read items from times collection if authenticated", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });

  it("Can only write own uid in friends collection", async () => {
    const db = getFirestore(myAuth);
    const testRef = db.collection("users").doc("123456");
    const userValid = {
      ...userDoc
    };
    await testRef.set(userValid);

    const testFriendsRef = db.collection("users/123456/friends").doc(myUser.uid)

    await firebase.assertSucceeds(testFriendsRef.set(myUser));

  });

  it("Can't write different than own uid in friends collection", async () => {
    const db = getFirestore(myAuth);
    const testRef = db.collection("users").doc("123456");
    const userValid = {
      ...userDoc
    };
    await testRef.set(userValid);

    const testFriendsRef = db.collection("users/123456/friends").doc("differentUID")

    await firebase.assertFails(testFriendsRef.set(myUser));

  });

});

describe("Conversations entry", () => {
    before( async () => {
        const db = getFirestore(myAuth);
        const testRef = db.collection("conversations").doc("asdaweqw");

        const conversationValid = {
            user_1_id: userDoc.uid,
            user_2_id: myUser.uid,
        };

        await testRef.set(conversationValid);

        const testRef2 = db.collection("conversations").doc("asdkjahsdkjw9o");

        const conversationValid2 = {
            user_1_id: userDoc.uid,
            user_2_id: "otherUID",
        };

        await testRef2.set(conversationValid2);

    })

    
    it("Can only read conversation if user is in it", async () => {
        const db = getFirestore(myAuth);
        
        const testRef = db.collection("conversations").doc("asdaweqw");

        await firebase.assertSucceeds(testRef.get());
    
      });

      it("Can't read conversation if user is not in it", async () => {
        const db = getFirestore(myAuth);
        
        const testRef = db.collection("conversations").doc("asdkjahsdkjw9o");

        await firebase.assertFails(testRef.get());
    
      });


});
    
describe("FriendRequests entry", () => {

    it("Can't send an inivitation to himself", async () => {
        const db = getFirestore(myAuth);
        
        const testRef = db.collection("friendRequests").doc("asda");
        
        const sendRequestValid = { 
            from: myUser.email,
            to: myUser.email
        }

        await firebase.assertFails(testRef.set(sendRequestValid));
    
      });
    

});
