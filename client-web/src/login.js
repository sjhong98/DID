import kakaoLogin from './images/kakao-login.png';



export default function Login() {

    const Rest_api_key='5e5e83f35a6ed8891b1e4e5f3d407bbf' //REST API KEY
    const redirect_uri = 'http://localhost:3000/login/auth' //Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    return(
        <div className="root login">
            <div className="login-header row-center">
                <p className="no-margin">DMRS</p>

            </div>
            <div className="login-body row-center">
                <div className="login-box column-center">
                    <p className="no-margin" style={{fontSize:'50px'}}>소셜로그인</p>
                    <img className='kakao-login pointer' src={kakaoLogin} onClick={handleLogin} />
                </div>
            </div>
        </div>

    )
}