import React, { useContext } from 'react';
import FashionImg from '../img/fast-fashion2.jpeg';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
const AboutUs = () => {
    const { language } = useContext(LanguageContext);
    return <section className='h-[800px] bg-gray-100 flex items-center'>
        <div className='container mx-auto flex justify-around h-fit w-full transition-all duration-300 bg-white py-32'>
            {/* text */}
            <div className='flex flex-col justify-center mx-4  lg:w-1/2'>
                {/* title */}
                <h1 className={`text-[70px] leading-[1.1] font-bold mb-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'عنا' : language === 'fr' ? 'QUI SOMMES-NOUS' : 'ABOUT US'}
                </h1>
                    <span className='font-semibold'>
                        {language === 'ar' ? `
                        مرحبًا بكم في أريلا كلوسي، وجهتك النهائية لأحدث الاتجاهات في الموضة! نحن متحمسون لتزويدك بأفضل تجربة تسوق، وتقديم مجموعة واسعة من الملابس الأنيقة وبأسعار معقولة التي تناسب أسلوبك الفريد. بدأت رحلتنا بفكرة بسيطة: الجمع بين الأفراد المتقدمين في مجال الموضة وتزويدهم بمنصة للتعبير عن أنفسهم من خلال ملابسهم. مع الاهتمام الشديد بأحدث الاتجاهات والالتزام بالجودة، نقوم برعاية مجموعة تعكس تنوع وفردية عملائنا. في أريلا كلوسي، نعتقد أن الموضة هي أكثر من مجرد ملابس ؛ إنه شكل من أشكال التعبير عن الذات، طريقة لعرض شخصيتك للعالم. سواء كنت تبحث عن الضروريات اليومية أو قطع البيان أو شيء ما بينهما، فقد قمنا بتغطيتك. فريقنا مكرس لضمان أن تجربة التسوق الخاصة بك ليست أقل من استثنائية. من موقعنا الإلكتروني سهل التنقل إلى فريق خدمة العملاء المتجاوب لدينا، نحن هنا لجعل تجربة التسوق الخاصة بك سلسة قدر الإمكان. شكرًا لك على اختيار أريلا كلوسي. نحن متحمسون للشروع في رحلة الموضة هذه معك!
                        ` : language === 'fr' ?
                        `Bienvenue sur Arela Clothsy, votre destination ultime pour les dernières tendances de la mode! Nous sommes passionnés de vous offrir la meilleure expérience de magasinage, offrant une large gamme de vêtements élégants et abordables qui convient à votre style unique. Notre voyage a commencé avec une idée simple : rassembler des individus avant-gardistes et leur fournir une plate-forme pour s’exprimer à travers leurs vêtements. Avec un œil attentif aux dernières tendances et un engagement envers la qualité, nous organisons une collection qui reflète la diversité et l’individualité de nos clients. Chez Arela Clothsy, nous croyons que la mode est plus qu’un simple vêtement; c’est une forme d’expression de soi, une façon de présenter votre personnalité au monde. Que vous soyez à la recherche d’essentiels de tous les jours, de pièces de déclaration ou de quelque chose entre les deux, nous avons ce qu’il vous faut. Notre équipe s’engage à ce que votre expérience d’achat soit tout simplement exceptionnelle. De notre site Web facile à naviguer à notre équipe de service à la clientèle réactive, nous sommes là pour rendre votre expérience d’achat aussi transparente que possible. Merci d’avoir choisi Arela Clothsy. Nous sommes ravis de vous accompagner dans cette aventure de la mode !`
                        :
                            `
          Welcome to Arela Clothsy, your ultimate destination for the latest trends in fashion! We are passionate about providing you with the best shopping experience, offering a wide range of stylish and affordable clothing that suits your unique style.

Our journey began with a simple idea: to bring together fashion-forward individuals and provide them with a platform to express themselves through their clothing. With a keen eye on the latest trends and a commitment to quality, we curate a collection that reflects the diversity and individuality of our customers.

At Arela Clothsy, we believe that fashion is more than just clothing; it's a form of self-expression, a way to showcase your personality to the world. Whether you're looking for everyday essentials, statement pieces, or something in between, we've got you covered.

Our team is dedicated to ensuring that your shopping experience is nothing short of exceptional. From our easy-to-navigate website to our responsive customer service team, we're here to make your shopping experience as seamless as possible.

Thank you for choosing Arela Clothsy. We're excited to embark on this fashion journey with you!
          `
                        }
                    </span>
            </div>
            {/* image */}
            <div className='hidden lg:flex w-1/2 h-full items-center mx-4 '>
                <img className='rounded-lg' src={FashionImg} alt="" />
            </div>
        </div>
    </section>;
};

export default AboutUs;
