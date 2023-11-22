interface CreateReviewDto {
  id_review: number;
  review_info: string;
  star: number;
  id_user_home : number;
  id_pet_home : number;      //รับจากหน้าบ้านส่งหลังบ้าน
  id_user_review : number;
  id_pet_review : number;
  admin_modify : string;
}