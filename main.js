// Axios Global Değişkenler
axios.defaults.headers.common['X-Auth-Token'] = 'herhangibibirtokenfalan'

// Get Request
function getTodos() {
  
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    params: {
      _limit: 5
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));

  // axios
  //   .get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout:5000}) // 5000 ms. sonra isteği durduracak.
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err)); // Kısa hali.

}

// Post Request
function addTodo() {
  
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'New Todo',
      completed: false
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));

  // axios
  //   .post('https://jsonplaceholder.typicode.com/todos', {
  //     title:'New Todo', 
  //     completed:false
  //   })
  //   .then(res=> showOutput(res))
  //   .catch(err => console.log(err));

}

// Put/Patch Request
function updateTodo() {
  
  // axios({
  //   method: 'put',
  //   url: 'https://jsonplaceholder.typicode.com/todos/1',
  //   data: {
  //     title: 'Updated Todo',
  //     completed: true
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  // axios
  //   .put('https://jsonplaceholder.typicode.com/todos/1', {
  //     title: 'Updated Todo',
  //     completed: true
  //   })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  axios({
    method: 'patch',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    data: {
      title: 'Updated Todo',
      completed: true
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));

  // axios
  //   .patch('https://jsonplaceholder.typicode.com/todos/1', {
  //     title: 'Updated Todo',
  //     completed: true
  //   })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

    /* Put Vs Patch

    - Put, kaynağı değiştirme yöntemi olarak söylenilmiş örnekten gidecek olursak put yönteminde userID gözükmüyor o parametre olarak gitmediği için parametreyi yok sayıyor gibi siliyor herhalde. 
    -Patch de ise parametre olarak giden özellikleri güncelliyor diğer özeliklere işlem yapmıyor ve gözüküyor misal userID.

    - 1 Put isteğini N kez gönderseniz bile 1 istek değişikliğine eşdeğer olmalıdır.
    - N tane Patch isteğine karşılık N farklı URI'ye sahip kaynak oluşuyor. 

    - Put yüksek bant genişliğine sahip. Patch te tersi durumlar söz konusudur.*/

}

// Delete Request
function removeTodo() {
  
  axios({
    method: 'delete',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));

  // axios
  //   .delete('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err)); 

}

// Simultaneous Data 
// Aynı anda birden fazla istek yapma ya da metotların verisini alma.
function getData() {

  // axios.all([
  //     axios.get('https://jsonplaceholder.typicode.com/todos'),
  //     axios.get('https://jsonplaceholder.typicode.com/posts')
  //   ])
  //     .then(res => {
  //       console.log(res[0]);
  //       console.log(res[1]);
  //       showOutput(res[1]);
  //     })
  //     .catch(err => console.error(err));

  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos, posts) => showOutput(todos)))
    .catch(err => console.error(err));

}

// Custom Headers
function customHeaders() {
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'herhangibibirtokenfalan'
    }
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New Todo',
        completed: false
      },
      config
    )
    .then( res => showOutput(res))
    .catch( err => console.log(err));
    
}

// Transforming Requests & Responses
function transformResponse() {
  
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Selam'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      
      data.title = data.title.toUpperCase();
      return data;

    })
  };

  axios(options).then(res => showOutput(res));

}

// Error Handling
function errorHandling() {
  
  axios
    .get('https://jsonplaceholder.typicode.com/todoss', 
    // {
    //   validateStatus: function(status) {
    //     return status < 500; // status 500 veya daha yüksek durumlarda çalışmayacak ve catch'e düşecek.
    //   }
    // }
    )
    .then(res => showOutput(res))
    .catch(err => {

      if(err.response){
        // Sunucu 2-- aralığından başka durum kodu cevaplarsa.
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if(err.response.status === 404){
          alert('Hata: Sayfa Bulunamadı.')
        } else if (err.request){
          // İstek oluşturulup cevaplanmazsa.
          console.error(err.request);
        } else {
          console.error(err.message)
        }
      }
    })
}

// Cancel Token
function cancelToken() {
  
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if(axios.isCancel(thrown)){
        console.log('İstek iptal edildi.', thrown.message);
      }
    });

    if (true) {
      source.cancel('İptal')
    } // Test edilmek için yazıldı herhangi bir sebepten istek iptal edilirse catch'e düşecek.
}

// Intercepting Requests & Responses
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} isteği gönderildi. ${config.url} ${new Date().toString()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }

); // Loglama. Kayıt altına alma.

// Axios Instances

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

// axiosInstance.get('/comments').then(res => showOutput(res));

// Show Output
function showOutput(res) {

  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>

    <div class="card mt-3">
      
      <div class="card-header">
        Headers
      </div>
      
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>

    </div>

    <div class="card mt-3">
      
      <div class="card-header">
        Data
      </div>
      
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
      
    </div>

    <div class="card mt-3">
      
      <div class="card-header">
        Config
      </div>
      
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
      
    </div>
    `;
}

// Event Listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
