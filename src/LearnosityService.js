import Learnosity from 'learnosity-sdk-nodejs';
import uuid from 'uuid/v4';

export default class LearnosityService {
  constructor () {
    this.authorApp = null;
    this.learnositySdk = new Learnosity();
  }

  initItemsEditor () {
    const request = this.learnositySdk.init(
      // service type
      "author", 

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
            'widget': {
              'edit': true,
              'delete': true
            },
            "item": {
              "reference": {
                "edit": true
              },
              "details": {
                "source": {
                  "edit": false
                }
              },
              "mode": {
                "show": false
              },
              "duplicate": {
                "show": false
              },
              "dynamic_content": true,
              "shared_passage": true,
              "title": {
                "show": true
              }
            }
          },
          "widget_templates": {
            "widget_types": {
              "show": false
            }
          },
          "dependencies": {
            "question_editor_api": {
              "init_options": {
                "group_defaults": false,
                "widget_type": "response",
                // "label_bundle": {
                //   "global.edit": "Editing"
                // },
                "ui": {
                  "layout": {
                    "global_template": "edit"
                    // "edit_panel": {
                    //   "mcq": {
                    //     "layout": "custom_mcq_layout"
                    //   } 
                    // }
                  },
                  "search_field": false,
                  "help_button": false,
                  "source_button": false,
                  "undo_redo_button": false
                },
                "base_question_type": {
                  "hidden": [
                    "penalty_score",
                    "multiple_responses",
                    "shuffle_options",
                    "validation.valid_response.score"
                  ],
                  "hidden_sections": [
                    "more_options.heading",
                    "more_options.divider",
                    "more_options.content",
                    "validation.alt_responses"
                  ]
                },
                "question_types": {
                  "mcq": {
                      "hidden_sections": [
                        "layout"
                      ],
                  }
                },
                "question_type_groups": [
                  {
                    "name": "Multiple Choice",
                    "reference": "mcq",
                    "template_references": [
                      "9e8149bd-e4d8-4dd6-a751-1a113a4b9163", 
                      "3egs0b24-5gs8-49fc-fds9-4a450sdg31ca"
                    ]
                  },
                  {
                    "name": "Fill in the Blanks (Cloze)",
                    "reference": "cloze",
                    "template_references": [
                      "51a8c1e7-f34f-4faf-b211-da458e891fcb",
                      "2fbba51b-e35e-441f-83c7-2662e2e81fa6"
                    ]
                  },
                  {
                    "name": "Classify, Match & Order",
                    "reference": "match",
                    "template_references": [
                      "ef2648de-f826-4674-b17d-71e71889d8e6",
                      "1fa22aac-1f88-47f7-941b-3c77759549e6",
                      "0c7f68f7-2be6-4ae0-8492-0ab78c8d0010"
                    ]
                  },
                  {
                    "name": "Hot Spots",
                    "reference": "other",
                    "template_references": [
                      "8ff43fa9-804b-42e7-9b3e-3cdd7e3a882b"
                    ]
                  }
                ]
              }
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

    return request;
  }

  initQuestionEditor () {
    return new Promise((resolve, reject) => {
      const request = this.learnositySdk.init(
        // service type
        "questions", 

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
          "widget_type": "response",
          "ui": {
            "help_button": false,
            "source_button": false,
            "undo_redo_button": false
          },
          "question_types": {
            "mcq": {
                "hidden": ["multiple_responses", "shuffle_options"],
                "hidden_sections": [
                  "layout",
                  "more_options.heading",
                  "more_options.divider",
                  "more_options.content"
                ],
            }
          }
        }
      );

      this.authorApp = window.LearnosityQuestionEditor.init(
        request,
        ".learnosity-question-editor",
        {
          readyListener: () => console.log('[LearnosityQuestionEditor] started')
        }
      );
    })
  }

  initActivityEditor () {
    return new Promise((resolve, reject) => {
      const request = this.learnositySdk.init(
        "author", 

        {
          "consumer_key": "yis0TYCu7U9V4o7M",
          "domain":       "localhost",
          "user_id":      "demo_student"
        },

        "74c5fd430cf1242a527f6223aebd42d30464be22",

        {
          "mode": "activity_edit",
          "config": {
            "activity_edit": {
              "reference": {
                "show": false
              },
              "source": false,
              "item_search": {
                "sort": false,
                "filter": {
                  "restricted": {
                    "current_user": true
                  }
                },
                "toolbar": {
                  "search": {
                    "show": false,
                    "widget_type": false,
                    "tags": {
                      "show": false
                    }
                  }
                }
              }
            },
            "item_list": {
              "filter": {
                "restricted": {
                  "current_user": true
                }
              },
              "title": {
                "show": true
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
            console.log('[success] activityEditor initialized');
            return resolve(this.authorApp);
          }
        }
      )
    });
  }

  preview (activityId, items, sessionId) {
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
        "session_id": sessionId,
        "user_id": "demo_student",
        "regions": {
          "top-left": [
            {
              "type": "title_element"
            }
          ],
          "top-right": [
            {
              "type": "timer_element"                
            },
            {
              "type": "itemcount_element"
            }
          ]
        },
        "navigation": {
          "show_intro": false,
          "show_outro": false,
        },
        "config": {
          "title": "Math Chapter 2 – Unit 7",
          "subtitle": "Walter White",
          "navigation": {
              "show_intro": true,
              "show_outro": true,
              "skip_submit_confirmation": false,
              "warning_on_change": false,
              "auto_save": {
                  "saveIntervalDuration": 500
              },
          "annotations": "true"
          }
        }
      }
    );

    return request;
  }

  initReportView (sessionId) {
    const request = this.learnositySdk.init(
      "reports", 

      {
        "consumer_key": "yis0TYCu7U9V4o7M",
        "domain":       "localhost",
        "user_id":      "demo_student"
      },

      // secret
      "74c5fd430cf1242a527f6223aebd42d30464be22",

      {
        "reports": [
            {
              "id": "report-1",
              "type": "session-detail-by-item",
              "user_id": "demo_student",
              "session_id": sessionId
            }
        ]
      }
    )

    return request;
  }
}