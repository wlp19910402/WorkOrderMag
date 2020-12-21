/**
 * 项目经验
 */
export interface ProjectExperiencesDataType {
  key: string;
  projectName?: string,
  projectTime?: string,
  projectDetail?: string,
  projectSkill?: string,
  workContent?: string,
  projectRole?: string,
  projectUrl?: string,
  projectStatus?: string,
  isNew?: boolean;
  editable?: boolean;
}
/**
 * 工作经验
 */
interface WorkExperienceDataType {
  key: string;
  companyName: string;
  workTime: string;
  companyDetail: string;
  jobName: string;
  jobDetail: string;
  projectExpreience: ProjectExperiencesDataType[] | undefined,
  isNew?: boolean;
  editable?: boolean;
}
