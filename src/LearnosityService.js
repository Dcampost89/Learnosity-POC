import Learnosity from 'learnosity-sdk-nodejs';
import uuid from 'uuid/v4';

export default class LearnosityService {
  constructor () {
    this.authorApp = null;
    this.learnositySdk = new Learnosity();
  }

  initItemsEditor () {
    // Render the item-edit widget
    return new Promise((resolve, reject) => {
      const request = this.learnositySdk.init(
        // service type
        "items", 
  
        // security details
        {
            "consumer_key": "yis0TYCu7U9V4o7M",
            "domain":       "localhost",
            "user_id":      "demo_student"
        },
  
        // secret
        "74c5fd430cf1242a527f6223aebd42d30464be22",
  
        // request details
        {
          "mode": "item_edit",
          "reference": uuid(),
          "config": {
            "item_edit": {
                "item": {
                  "reference": {
                      "edit": true
                  },
                  "dynamic_content": true,
                  "shared_passage": true
                }
            }
          },
          "user": {
            "id": "demos-site",
            "firstname": "Demos",
            "lastname": "User",
            "email": "demos@learnosity.com"
          }
        }
      );

      this.authorApp = window.LearnosityAuthor.init(
        request, 
        { 
          readyListener: () => {
            console.log('[success] itemEditor initialized');
            return resolve(this.authorApp)
            // this.authorApp.on('save:success', this.onSaveSuccessCb.bind(this))
          } 
        }
      )
    })
  }

  initActivityEditor () {
    return new Promise((resolve, reject) => {
      const request = this.learnositySdk.init(
        "items", 

        {
          "consumer_key": "yis0TYCu7U9V4o7M",
          "domain":       "localhost",
          "user_id":      "demo_student"
        },

        "74c5fd430cf1242a527f6223aebd42d30464be22",

        {
          "mode": "activity_edit",
          "config": {
            "activity_edit": {}
          },
          "user": {
            "id": "demos-site",
            "firstname": "Demos",
            "lastname": "User",
            "email": "demos@learnosity.com"
          }
        }

      );

      this.authorApp = window.LearnosityAuthor.init(
        request,
        {
          readyListener: () => {
            console.log('[success] activityEditor initialized');
            return resolve(this.authorApp);
          }
        }
      )
    });
  }

  preview (activityId, items) {
    console.log('[We are here]')
    const learnositySdk = new Learnosity();
    const request = learnositySdk.init(
      // service type
      "items", 

      // security details
      {
          "consumer_key": "yis0TYCu7U9V4o7M",
          "domain":       "localhost",
          "user_id":      "demo_student"
      },

      // secret
      "74c5fd430cf1242a527f6223aebd42d30464be22",

      // request details
      {
        "activity_id": activityId,
        "items": items,
        "name": "Test Activity",
        "rendering_type": "assess",
        "session_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "user_id": "demo_student",
        "config": {
          "title": "Math Chapter 2 – Unit 7",
          "subtitle": "Walter White",
          "regions": "main",
          "navigation": {
              "show_intro": true,
              "show_outro": true,
              "skip_submit_confirmation": false,
              "warning_on_change": false,
              "auto_save": {
                  "saveIntervalDuration": 500
              },
          "annotations": "true"
          },
          "time": {
              "max_time": 1500,
              "limit_type": "soft",
              "warning_time": 120
          },
          "configuration": {
              "shuffle_items": false,
              "idle_timeout": {
                  "interval": 300,
                  "countdown_time": 60
              }
          }
        }
      }
    );

    console.log('[request]', request);

    // Render the item-edit widget
    this.questionsApp = window.LearnosityItems.init(
      request, 
      { 
        readyListener: () => {
          console.log('[success] itemsApp initialized');
          // this.authorApp.on('save:success', this.onSaveSuccessCb.bind(this))
        } 
      }
    )
  }
}