
interface ResReviewDto {
  id_review: number;
  review_info: string;
  star: number;     //ไว้ระบุโครงสร้างข้อมูลที่ต้องการส่งในการตอบกลับจากแอพพลิเคชันของคุณผ่านเส้น API 
  id_user : number;
  id_pet : number;
  admin_modify : string;
}