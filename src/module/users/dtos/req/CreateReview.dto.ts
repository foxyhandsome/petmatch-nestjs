
interface CreateReviewDto {
  id_review: number;
  review_info: string;
  id_pet_owner : number;
  star: number;      //รับจากหน้าบ้านส่งหลังบ้าน
  id_user : number;
  id_pet : number;
  admin_modify : string;
}