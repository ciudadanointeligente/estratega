var inputs = {

    'bpmn.Gateway': {
        icon: {
            type: 'select',
            options: [
                { value: 'none', content: 'default' },
                { value: 'cross', content: 'exclusive' },
                { value: 'circle', content: 'inclusive' },
                { value: 'plus', content: 'parallel' }
            ],
            label: 'Type',
            group: 'general',
            index: 2
        },
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.body/fill': {
                type: 'color',
                label: 'Body Color ',
                group: 'general',
                index: 1
            }
        }
    },

    'bpmn.Activity': {
        content: {
            type: 'textarea',
            label: 'Content',
            group: 'general',
            index: 1
        },
        icon: {
            type: 'select',
            options: ['none','message','user'],
            label: 'Icon',
            group: 'general',
            index: 2
        },
        activityType: {
            type: 'select',
            options: ['task', 'transaction', 'event-sub-process', 'call-activity'],
            label: 'Type',
            group: 'general',
            index: 3
        },
        subProcess: {
            type: 'toggle',
            label: 'Sub-process',
            group: 'general',
            index: 4
        },
        attrs: {
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'general',
                index: 1
            }
        }
    },

    'bpmn.Event': {
        eventType: {
            type: 'select',
            options: ['start','end','intermediate'],
            group: 'general',
            label: 'Type',
            index: 2
        },
        icon: {
            type: 'select',
            options: [
                { value: 'none', content: 'none' },
                { value: 'cross', content: 'cancel' },
                { value: 'message', content: 'message' },
                { value: 'plus', content: 'parallel multiple' }
            ],
            label: 'Subtype',
            group: 'general',
            index: 3
        },
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'general',
                index: 1
            }
        }
    },

    'bpmn.Annotation': {
        content: {
            type: 'textarea',
            label: 'Content',
            group: 'general',
            index: 1
        },
        attrs: {
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'general',
                index: 1
            },
            '.body/fill-opacity': {
                type: 'range',
                min: 0,
                max: 1,
                step: 0.1,
                label: 'Transparency',
                group: 'general',
                index: 2
            }

        }
    },

    'bpmn.Pool': {
        lanes: {
            type: 'object',
            group: 'general',
            index: 1,
            attrs: {
                label: {
                    style: 'display:none;'
                }
            },
            properties: {
                label: {
                    type: 'text',
                    label: 'Label'
                },
                sublanes: {
                    type: 'list',
                    label: 'Add lanes',
                    item: {
                        type: 'object',
                        properties: {
                            label: {
                                type: 'text',
                                label: 'Label',
                                attrs: {
                                    label: {
                                        style: 'display:none;'
                                    }
                                }
                            },
                            sublanes: {
                                type: 'list',
                                label: 'Add sublanes',
                                item: {
                                    type: 'object',
                                    properties: {
                                        label: {
                                            type: 'text',
                                            label: 'Label',
                                            attrs: {
                                                label: {
                                                    style: 'display:none;'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        attrs: {
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'general',
                index: 1
            },
            '.header/fill': {
                type: 'color',
                label: 'Header Color',
                group: 'general',
                index: 2
            },
            '.lane-body/fill': {
                type: 'color',
                label: 'Lane Body Color',
                group: 'general',
                index: 3
            },
            '.lane-header/fill': {
                type: 'color',
                label: 'Lane Header Color',
                group: 'appearance',
                index: 4
            }
        }
    },

    'bpmn.Group': {
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.label-rect/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'appearance',
                index: 1
            }
        }
    },

    'bpmn.Conversation': {
        conversationType: {
            type: 'select',
            options: ['conversation', 'call-conversation'],
            label: 'Type',
            group: 'general',
            index: 2
        },
        subProcess: {
            type: 'toggle',
            label: 'Sub-process',
            group: 'general',
            index: 3
        },
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'appearance',
                index: 1
            }
        }
    },

    'bpmn.Choreography': {
        participants: {
            type: 'list',
            label: 'Particpants',
            item: {
                type: 'text'
            },
            group: 'general',
            index: 1
        },
        initiatingParticipant: {
            type: 'select',
            label: 'Initiating Participant',
            options: 'participants',
            group: 'general',
            index: 2
        },
        subProcess: {
            type: 'toggle',
            label: 'Sub-process',
            group: 'general',
            index: 3
        },
        content: {
            type: 'textarea',
            label: 'Content',
            group: 'general',
            index: 4
        },
        attrs: {
            '.body/fill': {
                type: 'color',
                label: 'Primary Color',
                group: 'appearance',
                index: 1
            },
            '.participant-rect/fill': {
                type: 'color',
                label: 'Secondary Color',
                group: 'appearance',
                index: 2
            }
        }
    },

    'bpmn.DataObject': {
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'appearance',
                index: 1
            }
        }
    },

    'bpmn.Message': {
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.body/fill': {
                type: 'color',
                label: 'Body Color',
                group: 'appearance',
                index: 1
            }
        }
    },

    'bpmn.StepLink': {
        description: {
            type: 'textarea',
            label: 'Description',
            group: 'general',
            index: 1
        }
    },


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    'bpmn.Step': {
        title: {
            type: 'text',
            label: 'Title',
            group: 'general',
            index: 1
        },
        content: {
            type: 'textarea',
            label: 'Content',
            group: 'general',
            index: 2
        },
        date: {
            type: 'text',
            label: 'Date or Timing',
            group: 'general',
            index: 3
        },
        tags: {
            type: 'text',
            label: 'Tags',
            group: 'Tags',
            index: 1
        },
        tags_color: {
            type: 'select',
            label: 'Tags Color',
            group: 'Tags',
            options: [
                { value: 'label-default', content: 'default' },
                { value: 'label-primary', content: 'primary' },
                { value: 'label-success', content: 'success' },
                { value: 'label-warning', content: 'important' },
                { value: 'label-danger', content: 'danger' }
            ],
            index: 2
        }
    },

    'bpmn.External': {
        title: {
            type: 'text',
            label: 'Title',
            group: 'general',
            index: 1
        },
        content: {
            type: 'textarea',
            label: 'Content',
            group: 'general',
            index: 2
        },
        date: {
            type: 'text',
            label: 'Date or Timing',
            group: 'general',
            index: 4
        },
        tags: {
            type: 'text',
            label: 'Tags',
            group: 'Tags',
            index: 1
        },
        tags_color: {
            type: 'select',
            label: 'Tags Color',
            group: 'Tags',
            options: [
                { value: 'label-default', content: 'default' },
                { value: 'label-primary', content: 'primary' },
                { value: 'label-success', content: 'success' },
                { value: 'label-warning', content: 'important' },
                { value: 'label-danger', content: 'danger' }
            ],
            index: 2
        }
    },

    'bpmn.Intervention': {
        title: {
            type: 'text',
            label: 'Title',
            group: 'general',
            index: 1
        },
        content: {
            type: 'textarea',
            label: 'Content',
            group: 'general',
            index: 2
        },
        date: {
            type: 'text',
            label: 'Date or Timing',
            group: 'general',
            index: 4
        },
        tags: {
            type: 'text',
            label: 'Tags',
            group: 'Tags',
            index: 1
        },
        tags_color: {
            type: 'select',
            label: 'Tags Color',
            group: 'Tags',
            options: [
                { value: 'label-default', content: 'default' },
                { value: 'label-primary', content: 'primary' },
                { value: 'label-success', content: 'success' },
                { value: 'label-warning', content: 'important' },
                { value: 'label-danger', content: 'danger' }
            ],
            index: 2
        }
    },

    'bpmn.Person': {
        name: {
            type: 'text',
            label: 'Name',
            group: 'general',
            index: 1
        },
        pos: {
            type: 'text',
            label: 'Position',
            group: 'general',
            index: 2
        },
        description: {
            type: 'textarea',
            label: 'Description',
            group: 'general',
            index: 3
        },
        image: {
            type: 'text',
            label: 'URL image',
            group: 'general',
            index: 4
        },
        size_type: {
            type: 'select',
            options: ['small','medium','large'],
            group: 'general',
            label: 'Size',
            index: 5
        },
        color: {
            type: 'select',
            label: 'Color',
            options: [
                { value: '#0091EA', content: 'blue' },
                { value: '#16D4AA', content: 'green' },
                { value: '#4A4A4A', content: 'grey' },
                { value: '#F5A623', content: 'orange' },
                { value: '#F55923', content: 'red' }
            ],
            group: 'general',
            index: 6
        }
    },

    'bpmn.Organization': {
        name: {
            type: 'text',
            label: 'Name',
            group: 'general',
            index: 1
        },
        parent: {
            type: 'text',
            label: 'Parent Organization',
            group: 'general',
            index: 2
        },
        description: {
            type: 'textarea',
            label: 'Description',
            group: 'general',
            index: 3
        },
        size_type: {
            type: 'select',
            options: ['small','medium','large'],
            group: 'general',
            label: 'Size',
            index: 4
        },
        color: {
            type: 'select',
            label: 'Color',
            group: 'general',
            options: [
                { value: '#0091EA', content: 'blue' },
                { value: '#16D4AA', content: 'green' },
                { value: '#4A4A4A', content: 'grey' },
                { value: '#F5A623', content: 'orange' },
                { value: '#F55923', content: 'red' }
            ],
            index: 5
        }        
    },

    'bpmn.GroupOrganization': {
        attrs: {
            '.label/text': {
                type: 'text',
                label: 'Name',
                group: 'general',
                index: 1
            },
            '.body/fill': {
                type: 'color',
                label: 'Color',
                group: 'general',
                index: 2
            }
        }
    },
};
