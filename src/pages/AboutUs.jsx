import React, { useContext } from "react";
import FashionImg from "../img/fast-fashion2.jpeg";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
const AboutUs = () => {
  const { language } = useContext(LanguageContext);
  return (
    <section className="bg-gray-100 flex items-center">
      <div className="container mx-auto justify-around w-full transition-all duration-300 bg-white py-32">
        {/* text */}
        <div className="flex flex-col justify-center m-16 ">
          {/* title */}
          <h1
            className={`text-2xl leading-[1.1] font-bold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? "عن اريلا كلوذسي"
              : language === "fr"
              ? "À propos d'Arela Clothsy"
              : "About Arela Clothsy"}
          </h1>
          <span
            className={`font-semibold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? `
                        مرحبًا بكم في اريلا كلوذسي حيث تلتقي الأناقة بالملابس اليومية. علامتنا التجارية هي احتفال بالأناقة والراحة والفردية، وتقدم مجموعة متنوعة من الملابس التي يتردد صداها مع الفرد الحديث المهتم بالموضة
!
                        `
              : language === "fr"
              ? `
              Bienvenue chez Arela Clothsy, où l’élégance rencontre le quotidien. Notre marque est une célébration du style, du confort et de l’individualité, offrant une gamme diversifiée de vêtements qui résonne avec l’individu moderne et soucieux de la mode.
         `
              : `
Welcome to Arela Clothsy, where elegance meets everyday wear. Our brand is a celebration of style, comfort, and individuality, offering a diverse range of apparel that resonates with the modern, fashion-conscious individual.
          `}
          </span>
          {/* image */}
          <div
            className={`hidden lg:flex w-full h-full items-center mx-4 ${
              language === "ar" ? "justify-end" : " justify-start"
            }`}
          >
            <img className="rounded-lg w-1/2" src={FashionImg} alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-center m-16">
          {/* title */}
          <h1
            className={`text-2xl leading-[1.1] font-bold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? "قصتنا"
              : language === "fr"
              ? "Notre histoire"
              : "Our Story"}
          </h1>
          <span
            className={`font-semibold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? `
                        مرحبًا بكم في اريلا كلوذسي حيث تلتقي الأناقة بالملابس اليومية. علامتنا التجارية هي احتفال بالأناقة والراحة والفردية، وتقدم مجموعة متنوعة من الملابس التي يتردد صداها مع الفرد الحديث المهتم بالموضة
!
                        `
              : language === "fr"
              ? `
              Fondée avec une passion pour la mode et un engagement envers la qualité, Arela Clothsy a commencé comme une petite boutique avec un grand rêve : redéfinir la mode quotidienne avec des pièces à la fois intemporelles et tendance. Aujourd’hui, nous sommes devenus une marque bien-aimée connue pour notre dévouement aux détails et notre souci du design. `
              : `
Founded with a passion for fashion and a commitment to quality, Arela Clothsy began as a small boutique with a big dream: to redefine everyday fashion with pieces that are both timeless and trendy. Today, we have grown into a beloved brand known for our dedication to detail and our eye for design.`}
          </span>
          {/* image */}
          <div
            className={`hidden lg:flex w-full h-full items-center mx-4 ${
              language === "ar" ? "justify-end" : " justify-start"
            }`}
          >
            <img className="rounded-lg w-1/2" src={FashionImg} alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-center m-16">
          {/* title */}
          <h1
            className={`text-2xl leading-[1.1] font-bold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? "مهمتنا"
              : language === "fr"
              ? "Notre mission"
              : "Our Mission"}
          </h1>
          <span
            className={`font-semibold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? `
                        في اريلا كلوذسي مهمتنا هي إلهام الثقة من خلال الملابس. نعتقد أن ما ترتديه يجب ألا يبدو جيدًا فحسب، بل يجعلك تشعر أيضًا بأنه لا يصدق. تم تصميم مجموعاتنا بعناية لتمكينك، سواء كنت متجهًا إلى المكتب، أو لقضاء يوم غير رسمي، أو ترتدي ملابس لقضاء ليلة في الخارج`
              : language === "fr"
              ? `
              Chez Arela Clothsy, notre mission est d’inspirer confiance à travers les vêtements. Nous croyons que ce que vous portez devrait non seulement être beau, mais aussi vous faire sentir incroyable. Nos collections sont soigneusement conçues pour vous habiliter, que vous alliez au bureau, pour une journée décontractée ou habillé pour une soirée.`
              : `
At Arela Clothsy, our mission is to inspire confidence through clothing. We believe that what you wear should not only look good but also make you feel incredible. Our collections are thoughtfully designed to empower you, whether you're heading to the office, out for a casual day, or dressed up for a night out.
`}
          </span>
          {/* image */}
          <div
            className={`hidden lg:flex w-full h-full items-center mx-4 ${
              language === "ar" ? "justify-end" : " justify-start"
            }`}
          >
            <img className="rounded-lg w-1/2" src={FashionImg} alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-center m-16">
          {/* title */}
          <h1
            className={`text-2xl leading-[1.1] font-bold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? "رؤيتنا"
              : language === "fr"
              ? "Notre vision"
              : "Our Vision"}
          </h1>
          <span
            className={`font-semibold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? `
                        نهدف إلى قيادة الطريق في ابتكار الأزياء مع التمسك بأعلى معايير الاستدامة. رؤيتنا هي مستقبل لا تتعلق فيه الموضة بالمظهر الجيد فحسب، بل تتعلق أيضًا بعمل الخير. نحن ملتزمون بالممارسات الصديقة للبيئة، والتوريد الأخلاقي، ودعم المجتمعات من خلال التجارة العادلة `
              : language === "fr"
              ? `
              Nous visons à montrer la voie dans l’innovation de la mode tout en maintenant les normes les plus élevées de durabilité. Notre vision est un avenir où la mode n’est pas seulement une question de bien paraître, mais aussi de bien faire. Nous nous engageons à adopter des pratiques respectueuses de l’environnement, à assurer un approvisionnement éthique et à soutenir les communautés par le biais du commerce équitable.`
              : `
We aim to lead the way in fashion innovation while upholding the highest standards of sustainability. Our vision is a future where fashion is not only about looking good but also about doing good. We are committed to eco-friendly practices, ethical sourcing, and supporting communities through fair trade.`}
          </span>
          {/* image */}
          <div
            className={`hidden lg:flex w-full h-full items-center mx-4 ${
              language === "ar" ? "justify-end" : " justify-start"
            }`}
          >
            <img className="rounded-lg w-1/2" src={FashionImg} alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-center m-16">
          
          <span
            className={`font-semibold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? `
                        .شكراً لاختيار اريلا كلوذسي ندعوك لاستكشاف أحدث مجموعاتنا وأن تصبح جزءًا من مجتمعنا النابض بالحياة. تابعنا في رحلتنا بينما نواصل تقديم أفضل ما لديك في الموضة بالقلب والروح`
              : language === "fr"
              ? `
              Merci d’avoir choisi Arela Clothsy. Nous vous invitons à explorer nos dernières collections et à faire partie de notre communauté dynamique. Suivez-nous dans notre voyage alors que nous continuons à vous apporter le meilleur de la mode avec cœur et âme.`
              : `
Thank you for choosing Arela Clothsy. We invite you to explore our latest collections and become part of our vibrant community. Follow us on our journey as we continue to bring you the best in fashion with heart and soul.`}
          </span>
          <span
            className={`font-semibold m-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar"
              ? `
                        
              .ابق أنيقًا، ابق واثقًا، ابقك مع اريلا كلوذسي`
              : language === "fr"
              ? `
              Restez élégant, restez confiant, restez vous avec Arela Clothsy.`
              : `
Stay stylish, stay confident, stay you with Arela Clothsy.`}
          </span>
         
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
