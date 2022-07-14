// ** JWT Service Import
import JwtService from "./jwtService";

// ** Export Service as jwtServiceInit
export default function jwtServiceInit(jwtOverrideConfig) {
  const jwt = new JwtService(jwtOverrideConfig);

  return {
    jwt,
  };
}