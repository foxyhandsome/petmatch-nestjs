interface CreatePetDto {
  id_pet: number;
  picture_pet: Buffer;
  sex_pet: string;
  health_pet: Buffer;
  name_pet: string;
  age_pet: number; //รับจากหน้าบ้านส่งหลังบ้าน
  id_skin: number;
  id_blood: number;
  id_user: number;
  id_breed: number;
}