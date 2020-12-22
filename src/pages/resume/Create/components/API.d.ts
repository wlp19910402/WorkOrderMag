/**
 * 项目经验
 */
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
/**
 * 工作经验
 */
export interface WorkExperienceDataType {
  key: string;
  companyName: string;
  workTime: string | null | undefined,
  companyDetail: string;
  jobName: string;
  jobDetail: string;
  projectExpreience: ProjectExperiencesDataType[] | []
}

export const workExpDefault: WorkExperienceDataType = {
  key: "",
  companyName: "",
  workTime: null,
  companyDetail: "",
  jobName: "",
  jobDetail: "",
  projectExpreience: [],
}