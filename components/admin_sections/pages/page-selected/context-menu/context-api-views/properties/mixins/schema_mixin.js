import objtifyConverter from '@/components/global-ui/objectify/converter'

export default {
    data: () => ({
        global: {
            // Normal
            id: {
              type: "string",
              minChar: 3,
              maxChar: 20,
              allowSpecialChars: false,
              allowWhiteSpace: false,
              hoverInfo: "Element Id",
              default: undefined
            },
            name: {
              type: "string",
              minChar: 1,
              maxChar: 100,
              default: null,
            },
            tabindex: {
              type: "number",
              min: 0,
              max: 999,
              step: 1,
              default: null,
            },
            // 
            isAList: {
              type: "select",
              options: ["Yes", "No"],
              default: null,
              hoverInfo: "dq-studio global attribute: re renders element repeatedly",
            },
            /**
             * 
             */
            "Fetch On": {
              type: "select",
              options: ["Server Side", "Client Side"],
              default: 1,
              hoverInfo: "dq-studio global attribute: re renders element repeatedly",
              renderCondition: {
                controllers: ['isAList'],
                method: schema => schema.isAList.default == 0
              }
            },
            /**
             * list origin from depends on isAList value
             */
            "list origin from": {
              type: "select",
              options: ["models", "collections"],
              default: null,
              hoverInfo: "dq-studio global attribute: re renders element repeatedly",
              renderCondition: {
                controllers: ['isAList'],
                method: schema => schema.isAList.default == 0
              }
            },
            /**
             * Collections list and Models depends on isAList value and list origin from value
             */
            "collection name": {
              type: "string",
              minChar: 1,
              maxChar: 900,
              allowWhiteSpace: false,
              default: null,
              renderCondition: {
                controllers: ["list origin from", "isAList"],
                method: schema => schema["list origin from"]["default"] == 1 && schema.isAList.default == 0
              }
            },
            models: {
              type: "string",
              minChar: 1,
              maxChar: 900,
              allowWhiteSpace: false,
              default: null,
              renderCondition: {
                controllers: ["list origin from", "isAList"],
                method: schema => schema["list origin from"]["default"] == 0 && schema.isAList.default == 0
              }
            },
        
              // draggable: {
              //   type: "select",
              //   options: [true, false],
              //   default: 1
              // },
              // dropzone: {
              //   type: "select",
              //   options: [true, false],
              //   default: 1
              // },
              // contenteditable: {
              //   type: "select",
              //   options: [true, false],
              //   default: 1
              // },
              // dir: {
              //   type: "select",
              //   options: [null, "ltr", "rtl", "auto"],
              //   default: 0
              // }
        },
        native: (tag) => {
            if(tag === 'html_audio') {
                return {
                    autoplay: {
                      type: "select",
                      options: [null, "autoplay"],
                      default: 0
                    },
                    controls: {
                      type: "select",
                      options: [null, "controls"],
                      default: 0
                    },
                    loop: {
                      type: "select",
                      options: [null, "loop"],
                      default: 0
                    },
                    muted: {
                      type: "select",
                      options: [null, "muted"],
                      default: 0
                    },
                    src: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      default: null
                    }
                  };
            }else if(tag === 'html_video') {
                return {
                    autoplay: {
                      type: "select",
                      options: [true, false],
                      default: 1
                    },
                    controls: {
                      type: "select",
                      options: [null, true],
                      default: 0
                    },
                    loop: {
                      type: "select",
                      options: [null, true],
                      default: 1
                    },
                    muted: {
                      type: "select",
                      options: [null, true],
                      default: 1
                    },
                    src: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    },
                    height: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    },
                    width: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    },
                    poster: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    }
                  };
            }else if(tag === 'html_img') {
                return {
                    alt: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    },
                    crossorigin: {
                      type: "select",
                      options: [null, "anonymous ", "use-credentials"],
                      default: 1
                    },
                    height: {
                      type: "string",
                      minChar: 1,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    },
                    ismap: {
                      type: "select",
                      options: [null, "ismap "],
                      default: 1
                    },
                    longdesc: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    },
                    src: {
                      type: "string",
                      minChar: 1,
                      maxChar: 500,
                      default: null
                    },
                    width: {
                      type: "string",
                      minChar: 1,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null
                    }
                  };
            }else if(tag === 'html_button') {
                return {
                    autofucos: {
                      type: "select",
                      options: [null, "autofocus"],
                      default: 0,
                      hoverInfo:
                        "Specifies that a button should automatically get focus when the page loads"
                    },
                    disabled: {
                      type: "select",
                      options: [null, "disabled"],
                      default: 0,
                      hoverInfo: "Specifies that a button should be disabled"
                    },
                    formaction: {
                      type: "string",
                      minChar: 3,
                      maxChar: 500,
                      allowWhiteSpace: false,
                      default: null,
                      hoverInfo: `Specifies where to send the form-data when a form is submitted. Only for type="submit"`,
                      renderCondition: {
                        controllers: ["type"],
                        method: schema => schema.type.default == 3
                      }
                    },
                    formenctype: {
                      type: "select",
                      options: [
                        null,
                        "application/x-www-form-urlencoded",
                        "multipart/form-data",
                        "text/plain"
                      ],
                      hoverInfo: `Specifies how form-data should be encoded before sending it to a server. Only for type="submit"`,
                      renderCondition: {
                        controllers: ["type"],
                        method: schema => schema.type.default == 3
                      }
                    },
                    formmethod: {
                      type: "select",
                      options: [null, "get", "post"],
                      default: 0,
                      hoverInfo: `Specifies how to send the form-data (which HTTP method to use). Only for type="submit"`,
                      renderCondition: {
                        controllers: ["type"],
                        method: schema => schema.type.default == 3
                      }
                    },
                    formnovalidate: {
                      type: "select",
                      options: [null, "formnovalidate"],
                      default: 0,
                      hoverInfo: `Specifies that the form-data should not be validated on submission. Only for type="submit" `,
                      renderCondition: {
                        controllers: ["type"],
                        method: schema => schema.type.default == 3
                      }
                    },
                    formtarget: {
                      type: "select",
                      options: [null, "_blank", "_self", "_parent", "top"],
                      default: 0,
                      hoverInfo: `Specifies where to display the response after submitting the form. Only for type="submit"`,
                      renderCondition: {
                        controllers: ["type"],
                        method: schema => schema.type.default == 3
                      }
                    },
                    type: {
                      type: "select",
                      options: [null, "button", "reset", "submit"],
                      default: 0,
                      hoverInfo: `Specifies the type of button`
                    },
                    value: {
                      type: "string",
                      minChar: 1,
                      maxChar: 500,
                      default: null,
                      hoverInfo: `Specifies an initial value for the button`
                    }
                  };
            }else if(tag === 'html_a') {
                return {
                    target: {
                      type: "select",
                      options: [null, "_blank ", "_parent", "_self", "_top"],
                      default: 0,
                      hoverInfo: `Specifies the context in which the linked resource will open.`
                    },
                    title: {
                      type: "string",
                      minChar: 1,
                      maxChar: 500,
                      default: null,
                      hoverInfo: `Defines the title of a link, which appears to the user as a tooltip.`
                    },
                    href: {
                      type: "string",
                      allowWhiteSpace: false,
                      default: "#",
                      hoverInfo: `Specifies the linked document, resource, or location.`
                    },
                    download: {
                      type: "select",
                      options: [null, true],
                      default: 0,
                      hoverInfo: `Directs the browser to download the linked resource rather than opening it.`
                    }
                  };
            } else {
              return null
            }
        },
        _$transformAttr:{
            transformOriginX: {
                type: "select",
                options: [null, "top", "center", "bottom"],
                default: 0
              },
              transformOriginY: {
                type: "select",
                options: [null, "left", "center", "right"],
                default: 0
              },
              perspective: {
                type: "number",
                min: 0,
                max: 999,
                step: 1,
                default: null
              },
              rotateX: {
                type: "number",
                min: -180,
                max: 180,
                step: 1,
                default: 0
              },
              rotateY: {
                type: "number",
                min: -180,
                max: 180,
                step: 1,
                default: 0
              },
              rotateZ: {
                type: "number",
                min: -360,
                max: 360,
                step: 1,
                default: 0
              },
              translateZ: {
                type: "number",
                min: -360,
                max: 360,
                step: 1,
                default: 0
              }
        }
    }),
    methods: {
        // convert
        objtifyConverter(schema,vanilla_obj) {
            return objtifyConverter(schema,vanilla_obj)
        },
        get_Schema(tag) {
            if(this.native(tag)) {
                return {
                    global: this.global,
                    native: this.native(tag)
                }
            } else {
                return {
                    global: this.global
                }
            }
        }
    }
}