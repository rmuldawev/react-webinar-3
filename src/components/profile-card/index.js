const ProfileCard = ({name,phone, email}) => {
    return (
        <div style={{marginLeft:"20px"}}>
            <h1 style={{fontWeight:700, fontSize:24}}>Профиль</h1>
            <p style={{fontSize:18}}>Имя: <span style={{fontWeight:700, fontSize:18}}>{name}</span></p>
            <p style={{fontSize:18}}>Телефон: <span style={{fontWeight:700, fontSize:18}}>{phone}</span></p>
            <p style={{fontSize:18}}>email: <span style={{fontWeight:700, fontSize:18}}>{email}</span></p>


        </div>
    )
}

export default ProfileCard