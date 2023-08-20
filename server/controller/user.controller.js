const db = require("../model/index.js");
const express = require("express");
const axios = require("axios");
const { use } = require("../routes/user.route");
const app = express();
const { medicalRecordRegister, createHash4DidUpdate } = require("./medicalRecord.controller.js");

/**
 * 로그인 시 유저가 회원가입을 했는지 DB 체크
 * @returns DB 저장유무에 따른 boolean 반환 
 */
const isUserRegistered = async (req, res) => {
  try {
    const access_token = req.body.token;
    const userInfo = await axios.post("https://kapi.kakao.com/v2/user/me", {}, {  // 두번째는 받는 파라미터, 세번째가 보내는 파라미터
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    return await userFind(userInfo.data.kakao_account)
      ? (res.status(200).send("already exist in DB")) 
      : (res.status(201).send("just signup in DB"))

  } catch (error) {
    return res.status(400).send(error);
  }
}

/**
 * 회원가입
 */
const signUp = async (req, res) => {
  try {
    // 회원가입이 완료되면 자동으로 로그인완료 화면으로 넘기면서, 가져온 데이터를 DB에 저장
    const {name, email, birthday, phoneNumber, isDoctor, address} = req.body.data;
    // 카카오톡 api로 이름, 번호, 주소, 생년월일, 성별 가져오기
    // 의료계종사자 유무 체크리스트
    // 지갑주소 만들어주기
    // PostgreSQL에다가 회원가입정보+지갑주소+니모닉을 저장.

    // 회원가입 후 did 폴더내의 1056 등록 함수를 호출해서 방금 생성된 지갑주소를 레지스트리에 등록해야함
    // babel로 묶어 쓰거나, 답변대로 동적 호출을 하던가.
    // signUp_DID({
    //   name: name, 
    //   email: email,
    //   birthday: birthday,
    //   phoneNumber: phoneNumber,
    //   isDoctor: isDoctor,
    //   address: address,
    // })

  }catch(error){

  }
  
}

/**
 * VC 요청
 */
const claim = async (req, res) => {
    // did 폴더내의 vc 받아오는 함수 호출
}

/**
 * 보유한 VC를 공유하기 위해 QR코드로 변환 후 화면에 송출
 */
const share = async (req, res) => {
    // VC가 유효기간이 지났는지 확인
    // claim을 통해 vc를 받은사람에 한해서, 의사에게 의료정보 공유할 시, vc 내용을 qr코드로 변환
    // 변환된 qr코드를 화면에 송출
}

/**
 * 의사가 요청한 DID 업데이트 승인 여부
 */
const approve = async (req, res) => {
    // 의사가 요청한 did 업데이트 승인 버튼
}

/**
 * 의사가 요청한 DID 업데이트
 */
const update = async (req, res) => {
  // 새롭게 추가된 진료내용을 db에 저장 
  medicalRecordRegister(req.body.medicalRecord);

  // 방금 저장된 것을 포함, db에 저장된 환자의 모든 내용을 반환
  // const dbData = 함수()

  // 환자가 가지고있던 jwt형태의 did를 조회해서 내용을 가져온 후 
  // -> 조회하는 내용
  // const data = 조회함수;

  // 그 내용 중 medicalRecords 카테고리에 새로운 해시 하나를 추가
  const hash = createHash4DidUpdate()
  // const updatedVcJwt = data + hash;
}

/**
 * 보유중인 VC를 이용하여 1056 레지스트리를 조회
 */
const retrieve = async (req, res) => {
    // vc를 보유중인 상태에서, 환자가 자신의 정보를 확인하기위해 did폴더내의 조회 함수 호출
}

/**
 * retrieve 함수를 통해 조회한 의료기록을 프론트로 전달
 */
const display = async (req, res) => {
    // 조회된 내역 프론트로 보내기
}

// const userFind = async (userInfo) => {
//   const data = await Member.findOne({where: {email: `${userInfo.email}`}});
//   if(data === null){
//     return !userRegister(userInfo);
//   }else{
//     console.log("already exist");
//     return true;
//   }
// }

// const userRegister = async (userInfo) => {
//   const userWallet = ethers.Wallet.createRandom();
//   Member.create({
//     name: `${userInfo.profile.nickname}`,
//     email: `${userInfo.email}`,
//     birthday: `${userInfo.birthday}`,
//     // phoneNumber:  `${userInfo.birthday}`,
//     isDoctor: false,
//     address: `${userWallet.address}`,
//   });
//   return true;
// }

module.exports = {
    isUserRegistered,
    signUp,
    claim,
    share,
    approve,
    retrieve,
    display,
};