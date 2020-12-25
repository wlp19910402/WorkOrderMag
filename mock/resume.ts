import { Request, Response } from 'express';
import { ResumeDataType } from '@/pages/resume/API.d'
import { parse } from 'url';
interface ResumeResponseDataType {
  data: ResumeDataType[] | [],
  status?: string;
  name?: string;
  id?: string;
  filter?: { [ key: string ]: any[] };
  sorter?: { [ key: string ]: any };
  pageSize?: number;
  currentPage?: number;
}
const headerImg = 'http://127.0.0.1:8000/resumeHeader.jpg'
const ResumeData: ResumeDataType[] = [
  {
    id: "1",
    status: "0",
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
    status: "0",
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
    status: "0",
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
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: ResumeDataType[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index.toString(),
      status: (index % 2).toString(),
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
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule (req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as ResumeResponseDataType;
  console.log(params)
  let dataSource = [ ...tableListDataSource ].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const sorter = JSON.parse(params.sorter as any);
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[ key ] === 'descend') {
          if (prev[ key ] - next[ key ] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[ key ] - next[ key ] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [ key: string ]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[ key ]) {
            return true;
          }
          if (filter[ key ].includes(`${item[ key ]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }
  if (params.id) {
    dataSource = dataSource.filter((data) => data.id.includes(params.id || ''));
  }
  if (params.name) {
    dataSource = dataSource.filter((data) => data.baseInfo.name.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    pageSize,
    current: 1,
    respCode: '000000',
    respMsg: '成功',
  };

  return res.json(result);
}
export default {
  'GET /resume/getResumeData': getResumeData,
  'POST /resume/fetchResumeDetail': fetchResumeDetailData,
  'GET /resume/getResumeDataList': getRule,
};