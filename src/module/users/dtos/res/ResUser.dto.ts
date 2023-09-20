
interface ResUserDto {
  id_user: number;
  username: string;
  password: string;
  information : string;   //ไว้ระบุโครงสร้างข้อมูลที่ต้องการส่งในการตอบกลับจากแอพพลิเคชันของคุณผ่านเส้น API 
  contact : string;
  id_district : number;
  id_subdistrict : number;
  id_typeuser : number;
}