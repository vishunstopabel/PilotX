import { AuthModel } from "../../models";
import { OAuth, Provider } from "../../types";

export const createAccountViaOauth = async (
  provider: Provider,
  userDetails: OAuth
) => {
  return AuthModel.create({
    ...userDetails,
    provider,
  });
};



 export const getUserViaEmail = async (email: string) => {

        return AuthModel.findOne({
            email:email
        })

};
