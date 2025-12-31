const VIDEO_EXPLANATIONS: Record<
  string,
  Record<
    string,
    {
      explanation?: string;
      livestream?: string;
    }
  >
> = {
  "2025-07-29": {
    "jp-urban": {
      livestream: "https://www.youtube.com/live/m6VJ275of7Y?si=JGWDRpKFN3mpZApH&t=491"
    },
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/m6VJ275of7Y?si=3kyWFBGa-rTCK38u&t=1228",
    },
  },
  "2025-07-30": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/m6VJ275of7Y?si=hyfpor47wAeuvdN_&t=2330",
    },
  },
  "2025-07-31": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/RU7hgzFkFs8?si=b6OE2NeRVL4grXb7&t=495",
    },
  },
  "2025-08-02": {
    "the-world": {
      explanation: "https://youtu.be/iq0fjQskQBA?si=XzttcjKNZySD8-3q",
      livestream: "https://www.youtube.com/live/rZpkOVCVimk?si=_BJvHUJxwNpPVDXP&t=22365"
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/rZpkOVCVimk?si=lvbsZ944je2PNIug&t=23115",
    },
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/RU7hgzFkFs8?si=6mI0_6Rw_BcARwJ7&t=2951",
    },
  },
  "2025-08-03": {
    "the-world": {
      livestream: "https://www.youtube.com/live/SXo60E_CUmA?si=kAb67K_EnndyjABu&t=22707",
    },
    "world-ACW": {
      explanation: "https://youtu.be/UCg-lkaRfB8?si=wofrD-LHUFdLuV3A",
      livestream: "https://www.youtube.com/live/SXo60E_CUmA?si=NX3JGju3ed3M-7R7&t=23333",
    },
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/Db-L1GDxIJI?si=nveZ_KEwmZ2_CUMg&t=698",
    },
  },
  "2025-08-04": {
    "the-world": {
      explanation: "https://youtu.be/PJg_Ycn5cY4?si=vyUVqEpULWM644DA",
      livestream: "https://www.youtube.com/live/jYKMGRpanmo?si=v5iZ5nspEzUN30MH&t=7965"
    },
  },
  "2025-08-05": {
    "the-world": {
      explanation: "https://youtu.be/LzKffwZb2TM?si=2E1tVOjufngWyh6D",
      livestream: "https://www.youtube.com/live/jYKMGRpanmo?si=2yIZD1lximWcUwJW&t=9084"
    },
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/Db-L1GDxIJI?si=5FbfbDxXVgzoQoV-&t=2762",
    },
  },
  "2025-08-06": {
    "the-world": {
      explanation: "https://youtu.be/CSPH-NEn3UA?si=Y-XZiOeiXNFoTSsz",
      livestream: "https://www.youtube.com/live/m6VJ275of7Y?si=NoUd0GmME6mfSK87&t=6713",
    },
    "world-ACW": {
      explanation: "https://youtu.be/UCg-lkaRfB8?si=wofrD-LHUFdLuV3A",
      livestream: "https://www.youtube.com/live/m6VJ275of7Y?si=P3yKo5ZpQY1GIODc&t=10020",
    }
  },
  "2025-08-07": {
    "the-world": {
      explanation: "https://youtu.be/9HJ23Ds3wNU?si=eRrL_MC_yxfD8oMB",
      livestream: "https://www.youtube.com/live/m6VJ275of7Y?si=Dlc7RwsmBj0iw99f&t=7926",
    },
    "world-ACW": {
      livestream:
        "https://www.youtube.com/live/m6VJ275of7Y?si=4sPjOhxdOKeKtVB6&t=11233"
    },
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/Cv4EkoI1xbs?si=6ihfL7oTJzEYfcej&t=795",
    },
  },
  "2025-08-09": {
    "the-world": {
      explanation: "https://youtu.be/mPXdeKjj9mU?si=HXs1LsntwO3lvcGj",
      livestream: "https://www.youtube.com/live/RU7hgzFkFs8?si=mRN8d8nn3lMpD-Cc&t=5228",
    },
  },
  "2025-08-15": {
    "the-world": {
      livestream: "https://www.youtube.com/live/Db-L1GDxIJI?si=xljskajo144oznVM&t=5003",
      explanation: "https://youtu.be/3-JJH1Y3k3Y?si=ZcaHnUtSjvzSBMls",
    },
  },
  "2025-09-01": {
    "the-world": {
      livestream: "https://www.youtube.com/live/Cv4EkoI1xbs?si=KAprT_UhtGZZvvyE&t=3343",
    },
    "world-ACW": {
      livestream:
        "https://www.youtube.com/live/FWmK2N2NSVQ?si=JUBQ5wr7r3vjNsMA&t=3449"
    },
  },
  "2025-09-02": {
    "the-world": {
      livestream: "https://www.youtube.com/live/Cv4EkoI1xbs?si=GqBlR4Ddpd50r25d&t=6376",
      explanation: "https://youtu.be/GDtkNU7emxk?si=27CSqKTo3gQdVq39",
    },
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/FWmK2N2NSVQ?si=EVL7vYOzQGEqF_zL&t=446",
    },
  },
  "2025-09-03": {
    "the-world": {
      livestream: "https://www.youtube.com/live/_JtZuCvArrI?si=vG76MplYoz1-WE7S&t=5925",
      explanation: "https://youtu.be/JEP_jVPm4xM?si=GmdNDUJCL0A0LZvk",
    },
  },
  "2025-09-04": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/KrwNuSBdnvE?si=RXpIdSueaelnncAa&t=420",
    },
  },
  "2025-09-15": {
    "the-world": {
      livestream: "https://www.youtube.com/live/KrwNuSBdnvE?si=_5dZZy-WHmBfQmzX&t=2390",
    },
  },
  "2025-10-01": {
    "the-world": {
      livestream: "https://www.youtube.com/live/adXsie-CRmU?si=fadyb29mswntpkly&t=6260",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/adXsie-CRmU?si=l4qqbW2ymtsqDWnl&t=12315"
    },
    "tw-balanced": {
      livestream: "https://www.youtube.com/live/j8ZW9FJ6Pxs?si=EgnUh9lbWWTLEEuD&t=353"
    },
  },
  "2025-10-02": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/FkSfmVm-JdA?si=vJYA796PVQpzZg2k&t=494",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/FkSfmVm-JdA?si=n-JMq-MsLWFXqhCt&t=2212",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/FkSfmVm-JdA?si=Sbkh5KyKcwOIwHVL&t=5855"
    },
  },
  "2025-10-09": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/adXsie-CRmU?si=rPYNKL1anwAslU68&t=525",
    },
  },
  "2025-10-10": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/j8ZW9FJ6Pxs?si=RB_NIaXRYhbpnNXC&t=2981",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/FkSfmVm-JdA?si=Gk0bLE1cEPHM7NYJ&t=11120"
    },
  },
  "2025-10-15": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/j8ZW9FJ6Pxs?si=Di0VmOJKmbC3euV7&t=7550"
    },
  },
  "2025-10-18": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/5tEctX2gNAs?si=9t4zkWkSd4zRk6y7&t=300",
    },
    "the-world": {
      livestream: "",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/5tEctX2gNAs?si=hQ4Sk7XnvD2FKGpe&t=4167"
    },
  },
  "2025-11-01": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/hqBNEpHvYfY?si=f86-HMi2YvVJdck5&t=435",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/3DknMwAeX-4?si=xFLgJ26T5QJEH_oY&t=4945",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/3DknMwAeX-4?si=MZlJpwPNuag1ie66&t=9917"
    },
    "tw-balanced": {
      livestream: "https://www.youtube.com/live/3DknMwAeX-4?si=EGdH9E9T7VfRrmsh&t=435"
    }
  },
  "2025-11-07": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/hqBNEpHvYfY?si=ulDefLTWJ3EVYlXk&t=3257",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/hqBNEpHvYfY?si=njKZtWu-wSoOe4bo&t=9755"
    },
    "tw-balanced": {
      livestream: ""
    }
  },
  "2025-12-01": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/SmsGoUJfjxc?si=DBIb-15wyCTeZ85i&t=3301",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/SmsGoUJfjxc?si=rWVs4jJY-MRaLbvQ&t=9790"
    },
    "tw-balanced": {
      livestream: "https://www.youtube.com/live/SmsGoUJfjxc?si=sjDj4t1AkyWq9JYe&t=564"
    }
  },
  "2025-12-05": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/trrVdVwo6ts?si=K2wZJ5-d2brH7Oh8&t=4027",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/trrVdVwo6ts?si=SlahnTkJT3vA2QX5&t=10615"
    },
    "tw-balanced": {
      livestream: "https://www.youtube.com/live/trrVdVwo6ts?si=WtQDnilPzQENDLtH&t=709"
    }
  },
  "2025-12-06": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/dqm4wcz4TYU?si=TNF2PsxbB3jqResm&t=3850",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/dqm4wcz4TYU?si=VG9pabYbK0Xtrmae&t=10786"
    },
    "tw-balanced": {
      livestream: "https://www.youtube.com/live/dqm4wcz4TYU?si=2PVHuCYO2nX3HI6w&t=652"
    }
  },
  "2025-12-20": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/zRw9_wIiay8?si=DV9gyGtIPAXSyO-Z&t=10121"
    },
    "tw-balanced": {
      livestream: ""
    }
  },
  "2025-12-21": {
    "jp-balanced": {
      livestream: "https://www.youtube.com/live/zRw9_wIiay8?si=KDxW-57pOgyKmWZk&t=457",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/zRw9_wIiay8?si=aTYTeOShmZqdjJcS&t=2869",
    },
    "world-ACW": {
      livestream: "https://www.youtube.com/live/zRw9_wIiay8?si=twavqd23cGD27eeW&t=6499"
    },
    "tw-balanced": {
      livestream: ""
    }
  },
  "2025-12-23": {
    "the-world": {
      explanation: "https://youtu.be/Xg4AYWTtohw?si=AI0-tkTd1a2QrrK0&t=27",
    },
  },
  "2025-12-24": {
    "the-world": {
      explanation: "https://youtu.be/Xg4AYWTtohw?si=Y2N7K6VXWuXC--2Z&t=190",
    },
  },
  "2025-12-25": {
    "the-world": {
      explanation: "https://youtu.be/Xg4AYWTtohw?si=wDySeYGSLZmpqVay&t=313",
    },
  },
  "2025-12-28": {
    "jp-balanced": {
      livestream: "",
    },
    "the-world": {
      livestream: "https://www.youtube.com/live/-5uFISW4Nw0?si=neQcFkKIhQvAt34V&t=6481",
    },
    "world-ACW": {
      livestream: ""
    },
    "tw-balanced": {
      livestream: ""
    }
  },
};

export default VIDEO_EXPLANATIONS;
