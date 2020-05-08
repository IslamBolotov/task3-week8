$(document).ready(function(){


    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=` //`0&limit=20`
    const idPoke = 'https://pokeapi.co/api/v2/pokemon/'
    

    
    let index = 0;
    $.ajax({
        url:pokemonUrl+index+`&limit=20`,
        success: function(data){
            $('.previous').on('click',function(){
                //$('body').html('')
                index -= 20;
                $.ajax({
                    url:pokemonUrl+index+`&limit=20`,
                    success: function(data){
                        pokemon(data)
                    },
                    error: function(error){
                        console.log(error);
                    }
                })
            });
            $('.next').on('click',function(){
               // $('.container').html('')
               
                index += 20;
                $.ajax({
                    url:pokemonUrl+index+`&limit=20`,
                    success: function(data){
                       
                        pokemon(data)
                    },
                    error: function(error){
                        console.log(error);
                    }
                })
            });

            pokemon(data)
        },
        error: function(error){
        console.log(error);
        }
    })




    const pokemon = (data) =>{
        try{
            $('.text-modal').html('')
            $('.container').html('')
            console.log(data);

            //data = data.next;
            const qwer = data.results
            
            qwer.forEach((item,i) => {
                $('.container').append(`
                    <div class="pokeName">${item.name}</div>
                `)
            })
            
            
            $('body').on('click','.pokeName',function(e){
              // console.log($(this).text());
                
               let textt = ($(this).text());
               
               qwer.forEach(item =>{
                   if(item.name === textt){
                       console.log(item.name);
                       id = item.url
                       console.log(id);
                       
                   }
               })
            
               
                $.ajax({
                    url: (id),
                    success: function(result){
                        console.log(result);
                        $('.text-modal').append(`
                        <div class="values">
                            <h4>Имя: ${result.name}</h4>
                            <h4>Тип: ${result.types[0].type.name}</h4>
                            <h4>Рост: ${result.height}</h4>
                            <h4>Вес: ${result.weight}</h4>
                        </div>
                        <div class="img">
                            <img src=${result.sprites.front_default} width="200px">
                        </div>

                    `)
                    $('.main-modal').fadeIn();
                    
                    },
                    error: function(error){
                        console.log(error);
                        
                    }

                })
              
            })
            

            $('.close-modal').on('click',function() { 
              
                 $('.main-modal').fadeOut()
            });
      
        }
        catch(error){
            console.log(error);
            
        }
    }

//https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20
//https://pokeapi.co/api/v2/pokemon/




})