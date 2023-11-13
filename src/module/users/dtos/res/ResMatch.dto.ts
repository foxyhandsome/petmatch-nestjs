interface ResMatchDto {
  id_match: number;
  id_userhome: number;
  id_pethome: number;
  id_userguest: number;
  id_petguest: number;
  match_userhome: boolean;
  match_userguest: boolean;
  match_dislike: boolean;  //รับจากหลังบ้านไปหน้าบ้าน
}