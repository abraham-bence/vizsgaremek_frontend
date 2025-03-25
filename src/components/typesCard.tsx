import Card from 'react-bootstrap/Card';


interface Props {
    type : string
}

function TypesCard({type} : Props) {

  const src = "src/assets/typeImages/" + type.toLowerCase() + ".jpg" 
  return (
    <Card className="bg-dark text-white">
      <Card.Img src={src} alt="Card image"  />
      <Card.ImgOverlay>
        <Card.Title>{type}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}

export default TypesCard;