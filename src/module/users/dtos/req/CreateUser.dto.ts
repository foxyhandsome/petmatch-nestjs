
interface CreateUserDto {
  id_user: number;
  username: string;
  password: string;
  information : string;     //รับจากหน้าบ้านส่งหลังบ้าน
  contact : string;
  id_district : number;
  id_subdistrict : number;
  id_typeuser : number;
}