
interface ResReviewDto {
  id_review: number;
  review_info: string;
  star: number;     //รับจากหลังบ้านไปหน้าบ้าน
  id_user_home : number;
  id_pet_home : number;
  id_user_review : number;
  id_pet_review : number;
  admin_modify : string;
}