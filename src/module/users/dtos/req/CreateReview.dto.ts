
interface CreateReviewDto {
  id_review: number;
  review_info: string;
  star: number;      //โครงสร้างข้อมูลที่รับมาเเละส่งผ่านเส้น API ใน NestJS
  id_user : number;
  id_pet : number;
  admin_modify : string;
}