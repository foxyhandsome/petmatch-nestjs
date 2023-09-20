
interface CreateUserDto {
  id_user: number;
  username: string;
  password: string;
  information : string;     //โครงสร้างข้อมูลที่รับมาเเละส่งผ่านเส้น API ใน NestJS
  contact : string;
  id_district : number;
  id_subdistrict : number;
  id_typeuser : number;
}