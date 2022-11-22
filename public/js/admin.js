window.onload = () => {
    if (!sessionStorage.email) {
        location.href = '/login';
    } else {
        fetch(`/get-user-admin?email=${sessionStorage.email}`)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.role && data.role.name === 'admin') {
                    
                } else {
                    location.href = '/';
                }
            })
    }
}