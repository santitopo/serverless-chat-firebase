const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotification = functions.database.ref("conversations/{conversationId}/messages/{messageId}").onCreate(async (snapshot) => {
    const user1Id = admin.firestore().collection("conversations").doc(snapshot.data().conversationId).get().data().user_1_id;
    console.log('user1Id', user1Id);
    const user2Id = admin.firestore().collection("conversations").doc(snapshot.data().conversationId).get().data().user_2_id;
    const sentBy = admin.firestore().collection("messages").doc(snapshot.data().messageId).get().data().sent_by;
    const userToNotify = sentBy === user1Id ? user2Id : user1Id;
    const sender = admin.firestore().collection("users").doc(user1Id).get();
    const receiver = admin.firestore().collection("users").doc(userToNotify).get();

    const notification = {
        notification: {
            title: "New message",
            body: `${sender.email} sent you a message`,
        },
        token: receiver.notificationToken,
    };
    await admin.messaging().send(notification);
});
