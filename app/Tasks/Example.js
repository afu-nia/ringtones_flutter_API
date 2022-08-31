'use strict'

const Task = use('Task')
const Database = use('Database');
const Notification = use('App/Models/Notification');
const MessagesLists = use('App/Models/MessagesList');
const User = use('App/Models/user');
const axios = require('axios');
const Config = use('Config');
const fcmKey = Config.get('app.fcmKey');

class Example extends Task {
  static get schedule() {
    return '0 */3 * * *'
  }

  async handle() {
    const notifications = await Database.table('messages_lists')
      .where('status', 0)
      .orderBy('id', 'desc');
    const current = await User.find(1);
    if (notifications.length > 0) {

      const randomNumber = Math.floor(Math.random() * notifications.length)
      console.log(randomNumber);
      const id = notifications[randomNumber].id;
      const topic = notifications[randomNumber].topic;
      const users = await Database.table('users').where('product', topic);
      const title = notifications[randomNumber].title;
      const body = notifications[randomNumber].body;
      console.log(id);
      const notification = await MessagesLists.find(id);
      notification.merge({
        status: 1
      });
      await notification.save();

      var data = JSON.stringify({
        "to": "/topics/" + topic,
        "data": {
          "sound": "default",
          "title": title,
          "body": body,
          "content_available": true,
          "priority": "high",
          "click_action": "FLUTTER_NOTIFICATION_CLICK"
        },
      });

      var config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Authorization': 'key=' + fcmKey,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log('ERROR--> ');
          console.log(error);
        });

      for (const currentUser in users) {
        const userID = users[currentUser].id;
        const notification = new Notification();
        notification.fill({
          userID: userID,
          topic,
          title: title,
          body,
          image: null,
        });
        await current.notifications().save(notification);
      }
    }
  }
}

module.exports = Example
