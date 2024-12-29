//----------for fetch home-page (hero&features and other blocks)  
export const homePageQuery = {
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"]
          },
          link: {
            populate: true
          }
          ,
          features: {
            populate: true
          }

        }
      }
    },
  }

//--------- for fetch globl (footer & header )sections
export const globalSections={populate:{
    header:{
      populate:{
        logo:{
          populate:true
        }
      
       ,
        button:{
          populate:true
        }
      }
      
      
    }
    ,
    footer:{
    populate:{
     logo:{
          populate:true
        },
         social_Links:{
          populate:true
        },
      }
       
    }
   
   }
  };