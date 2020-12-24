//基本信息数据的类型
export interface BaseInfoDataType {
  key: string;
  name: string;
  sex?: '男' | '女';
  nativePlace?: string;//籍贯
  residencePlace?: string;//现居住地
  ethnic?: string;//民族
  email?: string;
  phone?: string;
  dateBirth?: string;//出生日期
  education?: string;//学历
  headerImgUrl?: string;//头像
  jobIntention?: string;//求职意向
  salaryExpectation?: string;//期望薪资
  yearsWork?: string;//工作年限
}
//技能信息数据的类型
export interface SkillMasterDateType {
  key: string;
  skillName?: string;
  skillProficiency?: number;
}
//项目经验数据的类型
export interface ProjectExperiencesDataType {
  key: string;
  workKey?: string;
  projectName?: string,
  projectTime?: string | null | undefined,
  projectDetail?: string,
  projectSkill?: string,
  workContent?: string,
  projectRole?: string,
  projectUrl?: string,
  projectStatus?: string,
}
//工作经验数据的类型
export interface WorkExperienceDataType {
  key: string;
  companyName: string;
  workTime: string | null | undefined,
  companyDetail: string;
  jobName: string;
  jobDetail: string;
  projectExpreience: ProjectExperiencesDataType[] | []
}
//简历的数据类型
export interface ResumeDataType {
  id: string;
  baseInfo: BaseInfoDataType;
  skillMaster: SkillMasterDateType[] | [];
  workExperience: WorkExperienceDataType[] | [];
}
//工作经验的默认值
export const workExpDefault: WorkExperienceDataType = {
  key: "",
  companyName: "",
  workTime: null,
  companyDetail: "",
  jobName: "",
  jobDetail: "",
  projectExpreience: [],
}
//基础信息的默认值
export const BaseInfoDefault: BaseInfoDataType = {
  key: "",
  name: "",
  sex: '男',
  nativePlace: "",
  residencePlace: "",
  ethnic: "汉",
  email: "",
  phone: "",
  dateBirth: "",
  education: "本科",
  headerImgUrl: "",
  jobIntention: "",
  salaryExpectation: "",
  yearsWork: "",
}
//项目经验的默认值
export const projectExpDefault: ProjectExperiencesDataType = {
  key: '',
  workKey: '',
  projectName: "",
  projectTime: null,
  projectDetail: "",
  projectSkill: "",
  workContent: "",
  projectRole: "",
  projectUrl: "",
  projectStatus: "",
}

export const resumeDataDefault: ResumeDataType = {
  id: "",
  baseInfo: BaseInfoDefault,
  skillMaster: [],
  workExperience: [],
}