import { jsPDF } from 'jspdf';
import { handleHotelPDF } from '../../viewtrip/component/HotelRecommend';
import { handlePlacesPDF } from '../../viewtrip/component/PlacesToVisit';
import { handleInfoPDF } from '../../viewtrip/component/InfoSection';
import { Button } from '@/components/ui/button';

function HandleCompletePDF({ trip }) {
  const handleCompletePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Title centered
    doc.setFontSize(22);
    doc.text("AI Generated Trip Details", 105, y, { align: 'center' });
    y += 15;

    // Trip sections
    y = handleInfoPDF(doc, trip, y);
    y = handleHotelPDF(doc, trip, y);
    y = handlePlacesPDF(doc, trip, y);

    doc.save(`${trip?.id}`);
  };

  return (
    <div className="flex justify-center items-center">
      <Button variant="outline" size="lg" 
        onClick={handleCompletePDF}
        className="bg-blue-500 dark:bg-blue-600 text-white m-5 px-4 py-4  hover:cursor-pointer rounded-2xl dark:hover:bg-white dark:text-gray-300 dark:hover:text-black hover:shadow-2xl "
      >
        Download PDF
      </Button>
    </div>
  );
}

export default HandleCompletePDF;
