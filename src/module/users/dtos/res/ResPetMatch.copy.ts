interface ResPetMatchDto {
  id_pet: number;
  picture_pet: string;
  sex_pet: string;
  health_pet : string;  //รับจากหลังบ้านไปหน้าบ้าน
  name_pet : string;
  age_pet : number;
  id_skin : number;
  id_blood : number;
  id_user : number;
  id_breed : number;
  id_match : number;
  id_userhome : number;
  id_pethome : number;
  id_userguest : number;
  id_petguest : number;
  match_userguest : boolean;
  match_userhome : boolean;
  match_dislike : boolean;
  type_skin : string;
  type_blood : string;
  username : string;
  password : number;
  information : string;
  contact : string;
  id_district : number;
  id_subdistrict : number;
  id_typeuser : number;
  name_breed : string;
}