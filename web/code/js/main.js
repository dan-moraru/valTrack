let btn = document.querySelector('button');

btn.addEventListener('click', () => {
    let user = document.getElementById('user').value;
    let tag = document.getElementById('name').value;
    console.log('user: ' + user + 'tag: ' + tag);
});