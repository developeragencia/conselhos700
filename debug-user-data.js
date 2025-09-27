// Script para debugar dados do usuário
console.log('=== DEBUG USER DATA ===');

// Verificar localStorage
console.log('LocalStorage:', localStorage);
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}

// Verificar sessionStorage
console.log('SessionStorage:', sessionStorage);
for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    console.log(`${key}: ${value}`);
}

// Fazer login e verificar resposta
fetch('/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'alexmoura-2015@hotmail.com',
        password: '123456',
        role: 'client'
    })
})
.then(response => response.json())
.then(data => {
    console.log('LOGIN RESPONSE:', data);
    
    if (data.token) {
        // Buscar dados do usuário
        return fetch('/api/auth/user', {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        });
    }
})
.then(response => response ? response.json() : null)
.then(userData => {
    console.log('USER DATA FROM API:', userData);
})
.catch(error => {
    console.error('ERRO:', error);
});