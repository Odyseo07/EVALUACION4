require('dotenv').config();
const{leerInput,
inquirerMenu,
pausa,
listadoLugares
}=require('./helpers/inquirer');

const Busquedas = require('./models/busqueda');
const main = async()=>{
    let opt;
    const busquedas = new Busquedas();
    do{
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                //mostrar mensaje
                const termino= await leerInput('Ciudad: ');
                  //buscar lugares
                const lugares= await busquedas.ciudad(termino);
                //seleccionar lugar
                const id = await listadoLugares(lugares);
                if(id==='0') continue;
                const lugarSel = lugares.find(l=>l.id==id);
                 busquedas.agregarHistorial(lugarSel.nombre);           
                //clima
                const clima= await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log("Ciudad:", lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp );
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Como esta el clima:', clima.desc.green);
            break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx=`${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
        }    
        if(opt!==0)await pausa();
    }while (opt!==0);
}
main();