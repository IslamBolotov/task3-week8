$(document).ready(function(){


    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=` //`0&limit=20`
    
    

    
    let index = 0;
    const pokemon = async (index) =>{
        try{
            $('ul').html('')
            $('.text-modal').html('')
            const response = await fetch(pokemonUrl+index+`&limit=20`)
            const data  = await response.json()
            
            await main(data)
            
        }
        catch(error){
            console.log(error);
            
        }
    }
    pokemon(index)
    

    $('body').on('click','.previous', async () => {
        if(index == 0) return
        index-=20
        // $('.container').html('')
        // const response = await fetch(pokemonUrl+index+`&limit=20`)
        // const data  = await response.json()
        
        await pokemon(index);
        
        
        
    });
    $('body').on('click','.next', async () => {
        index+=20
        // $('.container').html('')
        // $('.text-modal').html('')
        // const response = await fetch(pokemonUrl+index+`&limit=20`)
        // const data  = await response.json()
        
        await pokemon(index);
        
    });

    $('.close-modal').on('click',function() { 
        $('.text-modal').html('')
         $('.main-modal').fadeOut()
      
    });


    function main(data) {
     
            
        $('.text-modal').html('')
        $('ul').html('')
        console.log(data);
        
        const qwer = data.results
        
        qwer.forEach((item,i) => {
            $('ul').append(`
            <li class="pokeName">${item.name}</li>
            `)

        })
        $('ul').append(`
            <button class="previous">Previous</button>   
            <button class="next">Next</button>
            `)
        
        $('.pokeName').on('click',function(){
            
            
        let textt = ($(this).text());
        
        console.log($(this).index());
        qwer.forEach(item =>{
                if(item.name === textt){
                    
                    $.ajax({
                        url: (item.url),
                        success: function(result){
                            //console.log(result);
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
                
                }
                
            })
        
        })
    
    }
})