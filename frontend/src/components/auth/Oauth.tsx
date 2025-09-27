import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { FaGithub } from "react-icons/fa"

function Oauth() {
  return (
    <div>
              <div className="flex flex-col gap-2">
            <Button className="cursor-pointer">
            <FcGoogle /> <span>Continue with google</span>
          </Button>
          <Button className="cursor-pointer">
            <FaGithub /> <span>Continue with Github</span>
          </Button>
          </div>
    </div>
  )
}

export default Oauth