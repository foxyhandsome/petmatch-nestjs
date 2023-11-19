interface ReqPetMatchInfoDto {
  id_userhome : number;
  id_pethome : number;
  id_userguest : number;
  id_petguest : number;
  match_userguest : boolean;
  match_userguest_deny : boolean;
  match_userhome : boolean;
  match_dislike : boolean;
}