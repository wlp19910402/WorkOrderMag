/**
 * 项目经验
 */
export interface ProjectExperiencesDataType {
  key?: string;
  projectName?: string,
  projectTime?: string,
  projectDetail?: string,
  projectSkill?: string,
  workContent?: string,
  projectRole?: string,
  projectUrl?: string,
  projectStatus?: string,
}

/**
 * 工作经验
 */
export interface WorkExperienceDataType {
  key: string;
  companyName: string;
  workTime: string;
  companyDetail: string;
  jobName: string;
  jobDetail: string;
  projectExpreience: ProjectExperiencesDataType[] | []
}

export const workExpDefault: WorkExperienceDataType = {
  key: "",
  companyName: "",
  workTime: "",
  companyDetail: "",
  jobName: "",
  jobDetail: "",
  projectExpreience: [],
}