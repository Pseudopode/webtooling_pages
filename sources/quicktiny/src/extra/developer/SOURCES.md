# Implementation references

The code in this group is independently authored. References establish API contracts and externally sourced facts; no proprietary QuickTiny implementation is included.

- [Valve Source SDK mouse input](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/client/in_mouse.cpp): Source-engine yaw default of 0.022 degrees per count. Other editable game presets represent commonly measured defaults and can vary with configuration; they are not claimed as official documentation. The formula preserves raw physical cm/360 only, not FOV, zoom, acceleration, or perceived sensitivity.
- [MDN Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API): actual browser input, controller exposure rules, button and axis semantics.
- [MDN Web Crypto verify](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify): browser verification APIs for HMAC, RSA PKCS1, RSA PSS, and ECDSA.
- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519): compact JWT structure and NumericDate claims.
- [RFC 7518](https://www.rfc-editor.org/rfc/rfc7518): JWA signature algorithm mappings.
- [Linux crontab manual](https://www.man7.org/linux/man-pages/man5/crontab.5.html): five fields, ranges, steps, names, and restricted day-field OR semantics. This implementation does not implement Quartz extensions.
- [Rockstar Games GTA VI](https://www.rockstargames.com/VI) and [Rockstar release-time support](https://support.rockstargames.com/articles/29jV3Cv2cCgvwM1XgtMO5o/grand-theft-auto-vi-regional-pre-load-and-release-times-on-playstation-5-and-xbox-series-x-or-s): launch at midnight local time on 19 November 2026, checked 12 November 2026. The local utility exposes an editable launch datetime and does not fetch news in the background. All graphics are original canvas drawings, without Rockstar artwork, screenshots, logos, or music.
