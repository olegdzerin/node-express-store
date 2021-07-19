    // const res = await fetch(`/cart/${customer.id}`);
                    // let people = ['geddy', 'neil', 'alex'];
                    // let afterSignup = ejs.render('<%= people.join(", "); %>', {people: people});
                //    const cart = await res.json();
                //     console.log(cart);
                //     localStorage.setItem('cart_id', cart.id);
                //     localStorage.setItem('user_id', customer.id);
                //     location.assign('/');
                //     console.log(localStorage.getItem('cart_id'));
                //     console.log(localStorage.getItem('user_id'));
jkj;'ljl;jl;'
                const form = document.querySelector('form');
                const emailError = document.querySelector('.email.error');
                const passwordError = document.querySelector('.password.error');
                const loginError = document.querySelector('.login.error');
            
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    emailError.textContent = '';
                    passwordError.textContent = '';
                    const name = form.name.value;
                    const email = form.email.value;
                    const password = form.password.value;
                    
                    try {
                        const res = await fetch('/login', {
                            method: 'POST',
                            body: JSON.stringify({
                                name,
                                email,
                                password
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        const customer = await res.json();
                        if (res.status === 400) {
                            loginError.textContent = customer;
                        }
                        if (res.status === 201) {
                          try{
                              const res = await fetch(`/cart/${customer.id}`);
                            //   
                              const cart = await res.json(); 
                              console.log(cart);
                              localStorage.setItem('cart_id', cart.id);
                              localStorage.setItem('user_id', customer.id);
                            location.assign('/');
                           console.log(localStorage.getItem('cart_id'));
                            console.log(localStorage.getItem('user_id'));
                          }catch(err){
                            console.log(err);
                          }
                            
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })

                 