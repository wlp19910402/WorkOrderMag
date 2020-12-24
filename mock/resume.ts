import { Request, Response } from 'express';
import { ResumeDataType } from '@/pages/resume/API.d'
// import headerImg from '@/assets/images/resumeHeader.jpg'
const headerImg = 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=谢怜头像&hs=2&pn=2&spn=0&di=1540&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1662662264%2C1474753313&os=113410661%2C3401107894&simid=4202688844%2C469328093&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=谢怜头像&objurl=https%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1662662264%2C1474753313%26fm%3D214%26gp%3D0.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52AzdH3F%3Ft1%3Dlc8nnaaba&gsm=3&islist=&querylist='
const ResumeData: ResumeDataType[] = [
  {
    id: "1",
    baseInfo: {
      key: "782",
      name: "wlp",
      sex: '女',
      nativePlace: "西安",
      residencePlace: "北京市北京城市昌平区",
      ethnic: "汉",
      email: "wlp6897@163.com",
      phone: "15701578892",
      dateBirth: "1991/04/02",
      education: "本科",
      headerImgUrl: headerImg,
      jobIntention: "Java工程师",
      salaryExpectation: "15-20k",
      yearsWork: "8年",
    },
    skillMaster: [
      {
        key: '1',
        skillName: "Java1",
        skillProficiency: 40,
      },
      {
        key: '2',
        skillName: "Javascript1",
        skillProficiency: 40,
      },
      {
        key: '3',
        skillName: "React1",
        skillProficiency: 40,
      }
    ],
    workExperience: [
      {
        key: "1",
        companyName: "亚大通讯网络有限责任公司1",
        workTime: "2008/09/08~2021/02/02",
        companyDetail: "公司描述，具体内容等待等，公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等。",
        jobName: "后台开发人员",
        jobDetail: "复制Java开发，已经上线项目维护。。。",
        projectExpreience: [
          {
            key: "1",
            workKey: "1",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          },
          {
            key: "2",
            workKey: "1",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          }
        ]
      },
      {
        key: "2",
        companyName: "亚大通讯网络有限责任公司1",
        workTime: "2008/09/08~2021/02/02",
        companyDetail: "公司描述，具体内容等待等，公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等。",
        jobName: "后台开发人员",
        jobDetail: "复制Java开发，已经上线项目维护。。。",
        projectExpreience: [
          {
            key: "1",
            workKey: "2",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          },
          {
            key: "2",
            workKey: "2",
            projectName: "家装分期2",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    baseInfo: {
      key: "782",
      name: "wlp",
      sex: '女',
      nativePlace: "西安",
      residencePlace: "北京市北京城市昌平区",
      ethnic: "汉",
      email: "wlp6897@163.com",
      phone: "15701578892",
      dateBirth: "1991/04/02",
      education: "本科",
      headerImgUrl: headerImg,
      jobIntention: "Java工程师",
      salaryExpectation: "15-20k",
      yearsWork: "8年",
    },
    skillMaster: [
      {
        key: '1',
        skillName: "Java2",
        skillProficiency: 40,
      },
      {
        key: '2',
        skillName: "Javascript2",
        skillProficiency: 40,
      },
      {
        key: '3',
        skillName: "React2",
        skillProficiency: 40,
      }
    ],
    workExperience: [
      {
        key: "1",
        companyName: "亚大通讯网络有限责任公司2",
        workTime: "2008/09/08~2021/02/02",
        companyDetail: "公司描述，具体内容等待等，公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等。",
        jobName: "后台开发人员",
        jobDetail: "复制Java开发，已经上线项目维护。。。",
        projectExpreience: [
          {
            key: "1",
            workKey: "1",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          },
          {
            key: "2",
            workKey: "1",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          }
        ]
      },
      {
        key: "2",
        companyName: "亚大通讯网络有限责任公司2",
        workTime: "2008/09/08~2021/02/02",
        companyDetail: "公司描述，具体内容等待等，公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等。",
        jobName: "后台开发人员",
        jobDetail: "复制Java开发，已经上线项目维护。。。",
        projectExpreience: [
          {
            key: "1",
            workKey: "2",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          },
          {
            key: "2",
            workKey: "2",
            projectName: "家装分期2",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    baseInfo: {
      key: "782",
      name: "wlp",
      sex: '女',
      nativePlace: "西安",
      residencePlace: "北京市北京城市昌平区",
      ethnic: "汉",
      email: "wlp6897@163.com",
      phone: "15701578892",
      dateBirth: "1991/04/02",
      education: "本科",
      headerImgUrl: headerImg,
      jobIntention: "Java工程师",
      salaryExpectation: "15-20k",
      yearsWork: "8年",
    },
    skillMaster: [
      {
        key: '1',
        skillName: "Java3",
        skillProficiency: 40,
      },
      {
        key: '2',
        skillName: "Javascript3",
        skillProficiency: 40,
      },
      {
        key: '3',
        skillName: "React3",
        skillProficiency: 40,
      }
    ],
    workExperience: [
      {
        key: "1",
        companyName: "亚大通讯网络有限责任公司3",
        workTime: "2008/09/08~2021/02/02",
        companyDetail: "公司描述，具体内容等待等，公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等。",
        jobName: "后台开发人员",
        jobDetail: "复制Java开发，已经上线项目维护。。。",
        projectExpreience: [
          {
            key: "1",
            workKey: "1",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          },
          {
            key: "2",
            workKey: "1",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          }
        ]
      },
      {
        key: "2",
        companyName: "亚大通讯网络有限责任公司3",
        workTime: "2008/09/08~2021/02/02",
        companyDetail: "公司描述，具体内容等待等，公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等公司描述，具体内容等待等。",
        jobName: "后台开发人员",
        jobDetail: "复制Java开发，已经上线项目维护。。。",
        projectExpreience: [
          {
            key: "1",
            workKey: "2",
            projectName: "家装分期",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          },
          {
            key: "2",
            workKey: "2",
            projectName: "家装分期2",
            projectTime: "2018/09/08~2021/02/02",
            projectDetail: "发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款发布任务，执行任务，下发贷款",
            projectSkill: "React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,React,typescript,umi,onsenui,",
            workContent: "此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容，此项目参与工作内容。",
            projectRole: "前端人员",
            projectUrl: "",
            projectStatus: "上线"
          }
        ]
      }
    ]
  }
]
function getResumeData (_: Request, res: Response) {
  return res.json(geneResult(ResumeData));
}
function fetchResumeDetailData (req: Request, res: Response) {
  const { id } = req.body;
  return res.json(geneResult(ResumeData.filter(item => item.id === id)));
}
function geneResult (result: any) {
  return {
    data: result,
    respCode: '000000',
    respMsg: '成功',
  };
}
export default {
  'GET /resume/getResumeData': getResumeData,
  'POST /resume/fetchResumeDetail': fetchResumeDetailData,
};