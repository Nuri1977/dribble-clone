import Link from "next/link";
import Image from "next/image";

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  name: string;
  avatarUrl: string;
  userId: string;
}

const ProjectCard = ({
  id,
  image,
  title,
  description,
  name,
  avatarUrl,
  userId,
}: Props) => {
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          alt={"Project Image"}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              alt={"Profile Image"}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3 ">
          <div className="flexCenter gap-2">
            <Image src="/heart.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{Math.floor(Math.random() * 300)}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="eye" />
            <p className="text-sm">{Math.floor(Math.random() * 1000)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
