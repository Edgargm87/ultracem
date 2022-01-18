/*
 Navicat Premium Data Transfer

 Source Server         : 51.161.8.230
 Source Server Type    : MySQL
 Source Server Version : 100328
 Source Host           : localhost:3306
 Source Schema         : focus

 Target Server Type    : MySQL
 Target Server Version : 100328
 File Encoding         : 65001

 Date: 17/01/2022 08:02:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for actualizacioncorporativa
-- ----------------------------
DROP TABLE IF EXISTS `actualizacioncorporativa`;
CREATE TABLE `actualizacioncorporativa`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `multimedia_id` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `bitactivo` tinyint NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_actualizacioncorporativa_multimedia1_idx`(`multimedia_id`) USING BTREE,
  INDEX `fk_actualizacioncorporativa_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_actualizacioncorporativa_multimedia1` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_actualizacioncorporativa_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of actualizacioncorporativa
-- ----------------------------
INSERT INTO `actualizacioncorporativa` VALUES (1, 'Actualización documento tal', 'Breakthrough Price Point for a Top Master’s Degree: For 2021 entry, at a total cost of £20,800 (for Islands/Overseas students) and £12,600 (or Home-UK students), Imperial College London’s Global MPH costs less than on-campus alternatives, as well as other top online programmes for international (non UK/European) students. Keep your job while earning the Global MPH degree, by studying online on your own schedule.', 11, 8, 0, 1628372799);
INSERT INTO `actualizacioncorporativa` VALUES (2, 'ULTMA ACTUALIZACIÓN DEL GESTOR', 'Ya esta disponible :\r\nContrato actualizado\r\nY promesa para Dehesa Park ', NULL, 13, 1, 1627854399);
INSERT INTO `actualizacioncorporativa` VALUES (35, 'ACTUALIZACIÓN DEL PERFIL USUARIO', 'Ya los clientes pueden ver en su perfil usuario , las formas ', 28, 13, 1, 1627854399);
INSERT INTO `actualizacioncorporativa` VALUES (36, 'Actualizo un documento corporativo ', 'Descripción del documento', 33, 13, 1, 1625175999);

-- ----------------------------
-- Table structure for area
-- ----------------------------
DROP TABLE IF EXISTS `area`;
CREATE TABLE `area`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `empresa_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_area_empresa1_idx`(`empresa_id`) USING BTREE,
  INDEX `fk_area_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_area_empresa1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_area_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of area
-- ----------------------------
INSERT INTO `area` VALUES (1, 'Talento Humano', 1, 8, 1610996926);
INSERT INTO `area` VALUES (2, 'Producto', 1, 8, 1610996926);
INSERT INTO `area` VALUES (3, 'Desarrollo', 1, 12, 1619883888);
INSERT INTO `area` VALUES (4, 'Administrativa', 1, 12, 1619884327);

-- ----------------------------
-- Table structure for beneficios
-- ----------------------------
DROP TABLE IF EXISTS `beneficios`;
CREATE TABLE `beneficios`  (
  `id` int NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_beneficios_usuario1_idx`(`usuario_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of beneficios
-- ----------------------------

-- ----------------------------
-- Table structure for comentario
-- ----------------------------
DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `usuario_id1` int NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_usuario_has_usuario_usuario4_idx`(`usuario_id1`) USING BTREE,
  INDEX `fk_usuario_has_usuario_usuario3_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_usuario_usuario3` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_usuario_usuario4` FOREIGN KEY (`usuario_id1`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comentario
-- ----------------------------

-- ----------------------------
-- Table structure for deseometa
-- ----------------------------
DROP TABLE IF EXISTS `deseometa`;
CREATE TABLE `deseometa`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `valormetas` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `como` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `salir` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `activo` tinyint NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_deseometa_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_deseometa_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of deseometa
-- ----------------------------
INSERT INTO `deseometa` VALUES (1, '3000000', 'vendiendo', '2000000', 1626022188, 1, 15);

-- ----------------------------
-- Table structure for detallenoticia
-- ----------------------------
DROP TABLE IF EXISTS `detallenoticia`;
CREATE TABLE `detallenoticia`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parrafo` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `bitactivo` tinyint NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `noticia_id` int NOT NULL,
  `multimedia_id` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_detalleactualizacion_actualizacion1_idx`(`noticia_id`) USING BTREE,
  INDEX `fk_detalleactualizacion_multimedia1_idx`(`multimedia_id`) USING BTREE,
  INDEX `fk_detalleactualizacion_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_detalleactualizacion_actualizacion1` FOREIGN KEY (`noticia_id`) REFERENCES `noticia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalleactualizacion_multimedia1` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalleactualizacion_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detallenoticia
-- ----------------------------

-- ----------------------------
-- Table structure for documentacion
-- ----------------------------
DROP TABLE IF EXISTS `documentacion`;
CREATE TABLE `documentacion`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `area_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `multimedia_id` int NULL DEFAULT NULL,
  `eliminado` tinyint NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_documentacion_area1_idx`(`area_id`) USING BTREE,
  INDEX `fk_documentacion_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_documentacion_multimedia1`(`multimedia_id`) USING BTREE,
  CONSTRAINT `fk_documentacion_area1` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_documentacion_multimedia1` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_documentacion_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of documentacion
-- ----------------------------
INSERT INTO `documentacion` VALUES (2, 'Examen general', 2, 13, 'Preguntas en general', 1616428889, 25, 0);
INSERT INTO `documentacion` VALUES (3, 'Proyecto Nogales ', 2, 13, 'Treinta años después de la Asamblea Constituyente, varios de sus miembros siguen en pie en la vida pública como testimonio de la Carta Magna que cambió el país. Tal como Fernando Carrillo.', 1616462171, 34, 0);
INSERT INTO `documentacion` VALUES (4, 'Diseño de  cimentación de nuestros edificios', 2, 13, 'Se hace un estudio de suelo donde se va a cimentar la edificación, por parte de un ingeniero geotecnista, quien pasa un informe de la composición del suelo, la capacidad portante y sus recomendaciones. Con esta información el ingeniero estructural hace el diseño de la cimentación del edificio.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (5, 'Norma sismoresistente', 2, 13, 'Sí, nuestros proyectos cumplen con la NSR-10  (norma sismo resistente colombiana).', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (6, 'Sistema de construcción que se maneja en los muros', 2, 13, 'Muros tipo túnel. Se basa en la utilización de formaletas de grandes dimensiones para realizar la fundida monolítica de muros y placas en concreto de una unidad estructural por ciclo diario de producción.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (7, 'Cuántos apartamentos hacemos diariamente', 2, 13, 'Dos y tres apartamentos por día', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (8, 'Medida en general entre piso y placa internamente', 2, 13, '2,40 mtrs', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (9, 'Grosor en las paredes estructurales del edificio Nogales Club Condominio', 2, 13, '10 cm y las placas son de 20 cm', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (10, 'Material que se utiliza en los exteriores de los edificios', 2, 13, 'GRANIPLAST, Acabado texturizado para fachadas', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (11, 'Beneficios del Graniplast', 2, 13, '●	Resistencia y durabilidad a la intemperie.\r \r ●	Forma una barrera de alta repelencia al agua lluvia.\r \r ●	Excelente estabilidad de color a los rayos UV.\r \r ●	Contiene granos de cuarzo de tamaño controlado logrando un rayado uniforme.\r \r ●	Permite el mantenimiento con agua y o repinte con pinturas acrílicas de uso interior y exterior.\r \r ●	Flexible, responde adecuadamente a la expansión y contracción generada por los cambios térmicos.\r ●	Producto especial para proyectos eco-sostenibles.\r \r ● No es combustible y no es tóxico.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (12, 'Puntos de aire', 2, 13, 'Energía 220 voltios', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (13, 'Puntos de aire cuantos hay dónde están localizados', 2, 13, 'DP-SP-PP-DHP-NG-CANARIAS-HB3 puntos de aire, habitación principal – secundaria y auxiliar o punto de aire en sala eliminado la auxiliar', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (14, 'Con qué sistema de almacenamiento cuenta Nogales Club', 2, 13, 'Con un tanque subterráneo de almacenamiento de agua con sus respectivos                   sistemas de bombeo tanto para el suministro de consumo residencial como para la red contraincendios del chut de basuras', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (15, 'De dónde llega el suministro de agua potable para el proyecto Nogales', 2, 13, 'Acueducto del municipio de Cúcuta', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (16, 'Qué tipo de encerramiento se utiliza', 2, 13, 'Muros en mampostería, reja y arborización', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (17, 'Cuál es la capacidad de los ascensores que se implementan en los proyectos', 2, 13, '8 personas o 550 Kg Marca estilo y ahora los koyo que permiten 8 personas 660 kg', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (18, 'Cobertura máxima de la planta eléctrica emergente', 2, 13, 'Cobertura máxima de 12 horas solo para áreas comunes', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (19, 'Que sistema constructivo usamos para los proyectos mayores a 25 pisos', 2, 13, 'Sistema constructivo mixto, es decir, sistema constructivo industrializado y tradicional', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (20, 'Cuáles son los dos sistemas constructivos utilizados en la distribución interna de aptos', 2, 13, 'Se utiliza el sistema constructivo industrializado para muros perimetrales y muros de zonas húmedas (baños, zona de ropas y cocina). Y muros en drywall (sistema flexible y liviano) para muros divisorios de habitaciones  ', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (21, 'KIT DE ACABADOS', 2, 13, 'CON KIT\r COCINA: Mueble superior con campana, salpicadero de 60 cms. Mueble bajo con horno empotrado bajo estufa.\r CARPINTERIA: Closets con puerta corredera para alcoba principal y alcobas auxiliares, *en algunos proyectos se ofrece escritorio empotrado en estudio, mueble superior para estudio y/o mueble de tv.\r \r BAÑOS: Enchape completo de piso a placa, incrustaciones en acero inoxidable (papelera, toallero, repisa ducha), cambio de grifería base por grifería mono control, divisiones en vidrio templado, mueble bajo en madera con mesón en porcelanato, lavamanos tipo bisel ovalado blanco.\r \r ZONA DE ROPAS: División en aluminio con vidrio templado. *Aplica solo para Nogales y Torres del bosque.\r \r PISOS: Porcelanato\r', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (22, 'SIN KIT DE ACABADOS', 2, 13, 'COCINA: Mueble inferior, estufa empotrada, mesón en granito, salpicadero de 5cms aprox. Lavaplatos en acero inoxidable.\r CARPINTERIA: Puerta principal, de habitaciones y baños\r \r BAÑOS: Enchape en zona de ducha, combo sanitario básico, lavamanos con pedestal, incrustaciones en cerámica (papelera, toallero, repisa de ducha) y grifería base.\r \r ZONA DE ROPAS: Lavadero con mueble inferior en fibra de vidrio (Torres del Bosque no lleva mueble inferior)\r \r PISOS: Cerámica', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (23, 'Modificaciones permitidas en el apartamento REALIZADAS POR EL CLIENTE después de la entrega', 2, 13, 'Es permitido realizar modificaciones en los muros de drywall, enchape o cambios de pisos, pintura y adición de muebles (teniendo en cuenta que en el momento de realizar modificaciones afecta la garantía de lo intervenido). No se permite tumbar y regatear los muros estructurales y fundidos en concreto. *En el manual que se le entrega al propietario se le especifica el tipo de modificaciones que puede o no realizar*', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (24, 'Explique las modificaciones permitidas en etapa de obra ', 2, 13, 'Las modificaciones permitidas en fase de construcción o sobre planos son: el cambio de tipología de 2 a 3 habitaciones o viceversa, la adición de kits de acabados. \r No está permitido que el cliente traiga materiales para cambio por parte de la constructora. Ej: pisos. En caso de no querer adquirir los acabados que ofrece la constructora, se puede entregar el apartamento solo con el material de los acabados, para que el cliente haga la modificación, luego de la entrega. *Sin variar el precio del apto* y siempre y cuando el cliente haga el pago a contado.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (47, 'Qué proveedores se manejan en los proyectos según su especialidad', 2, 13, 'MOBLACASA: Madera (Puertas, closets, carpintería cocina, estudios)\r ARTEMARMOL: Granito (cocina y barra en cocina)\r INDUMETALICAS: Aluminio y vidrio (ventanas, puertas corredizas balcones y patio de ropa) \r ACINCO: Mobiliario (Puertas, closets, carpintería cocina, estudios, espejos, lámparas)\r DECOESPACIOS: Mobiliario (Puertas, closets, carpintería cocina, estudios, espejos, lámparas)', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (48, 'Cuáles son los medios de pago para la cuota ', 2, 13, 'Tarjeta BBVA: después de la compra puede ser reclamada en la constructora, esta corresponde a un formato de recaudo para pago en el banco BBVA en cualquier parte del país sin costo.\r Gestor Celeus: En la página web de la empresa, La clave le es asignada en la llamada de servicio y evaluación de la venta, en el área de servicio al cliente quien acompañará el proceso de asignación de clave, también puede enviársele el video instructivo para que lo realice cada persona.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (49, 'Cuándo y cómo reclama el contrato de inversión el cliente', 2, 13, 'Puede ser solicitado los días martes, luego de 10 días del siguiente mes de la compra  y es directamente en la constructora o área de servicio al cliente para envío por correo electrónico.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (50, 'Cuál es el porcentaje de descuento en caso de desistimiento o Garantía de seriedad de la oferta', 2, 13, '100% del valor total de la separación + 40 % de los valores aportados del saldo', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (51, 'Qué proceso debe seguir una persona que desiste en etapa de pre separación ', 2, 13, 'Debe solicitar por medio de PQ la devolución en la constructora, presentar el recibo original de la separación y esperar respuesta entre los 15 días hábiles siguientes y devolución a más tardar en 30 días. Recordar que en estos momentos este proceso tiene un  costo administrativo de $80.000', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (52, 'Cuándo inicia la Construcción de los proyectos', 2, 13, 'Cuando se cumple el punto de equilibrio, del 70%', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (53, 'Cuál es la diferencia entre un  contrato de inversión y contrato de promesa de compraventa', 2, 13, 'La diferencia es la etapa del proyecto, el primero se realiza para apartamentos que no cuenta con Reglamento de propiedad horizontal, ya que están en planos o en proceso de construcción y la segunda se realiza cuando un proyecto ya se encuentra construido y cuenta con matrícula inmobiliaria para cada inmueble', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (54, 'Qué tipo de interés se cobra ', 2, 13, 'El interés que se cobra, es moratorio y es del 1.74%', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (55, 'Si un cliente pregunta, por qué en el contrato de inversión no aparece nombrado Celeus Group, sino aparece Promotora Inmobiliaria Pardal ', 2, 13, 'Se le explica que Celeus Group, es la marca compuesta por 4 constructoras, la promotora y los contratistas de kits, quienes finalmente ejecutan la obra, esto puede constarse en la primera parte del contrato, donde se especifica quiénes son las partes y la Promotora representa a cada constructora a nivel administrativo y comercial', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (56, 'Cuáles son las constructoras que componen Celeus Group ', 2, 13, 'Constructora Viviendas y Proyectos S.A.S:   Torres del Bosque y Delta Park \r       Grupo Ibsa Constructora Viviendas S.A.S:  Silver Park, Praga Park, Dehesa Park\r       Cristales Proyectos Construcciones S.A.S:  Nogales Club Condominio-HOBBY\r       Aticca Desing: Canarias Club Condominio', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (57, 'Cuál es el plazo de financiación ', 2, 13, 'El plazo es 8 meses antes del pago de la cuota inicial del apartamento ', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (58, 'Documentos que debe firmar el cliente para legalizar la compra de un  kit', 2, 13, 'Simulador, Cotizador y contrato', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (59, 'Por qué el kit de acabados se vende separado del valor del apartamento', 2, 13, 'Los apartamentos se entregan con acabados básicos habitables. El kit no hace parte del contrato del apartamento, con el fin que el cliente cuente con la posibilidad de personalizarlo a su gusto a futuro. Es importante que este cancelado antes de la fecha final de la cuota inicial , y esto a ingeniería a tener mejor control de que apto si llevan kit y cuales no', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (60, 'Tiempo de garantía tienen los kits de los acabados', 2, 13, 'Se otorga un año de garantía, desde la entrega del apartamento', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (61, 'Qué tipo de kits ofrece la constructora para los apartamentos', 2, 13, 'Kit de acabados, kit de domótica y kit de piso', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (62, 'Los acabados tienen un cobro de interes', 2, 13, 'Si, se cobra y está en a clausula décima tercera del contrato del kit, reconocimiento de intereses el cual indica que el cliente cancela un interés moratorio del 1,74 %', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (63, 'Qué es la  Fiducia', 2, 13, 'Es un contrato por medio del cual una persona llamada fideicomitente, entrega uno o varios bienes a una sociedad fiduciaria para que ésta cumpla una finalidad determinada a favor del fideicomitente o de un tercero designado por éste, llamado beneficiario. Existen dos modalidades de fiducia: fiducia mercantil (cuando hay transferencia de la propiedad del bien) y encargo fiduciario (cuando no hay transferencia de la propiedad).', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (64, 'Qué hace la fiduciaria', 2, 13, 'La sociedad fiduciaria es una entidad vigilada por la SFC (Superintendencia Financiera de Colombia) y participa con el propósito de promover la confianza y transparencia en la administración de los recursos de las personas que se vinculen a los proyectos inmobiliarios.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (65, 'Qué es un fideicomiso inmobiliario', 2, 13, 'Es un negocio fiduciario en virtud del cual se transfiere un bien inmueble a la entidad fiduciaria para que administre y desarrolle un proyecto inmobiliario, de acuerdo con las instrucciones señaladas en el contrato, y transfiera las unidades construidas a quienes resulten beneficiarios del respectivo contrato.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (66, 'Por qué se tiene fiducia en los proyectos', 2, 13, 'La constructora tiene fiducia, ya que es un requisito que nos hace el banco a cargo del crédito constructor y se encarga de administrar los recursos para la construcción del proyecto. La fiducia solo es administradora de los recursos, pero la constructora es la responsable de la entrega del proyecto.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (67, 'Cuánto es el valor de la comisión del  banco cuando se consigna desde otra ciudad', 2, 13, 'No aplican consignaciones. Los únicos medios de recaudo son: Gestor Celeus, Tarjeta de recaudo BBVA y Fiducia.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (68, 'Por qué es importante que dejen estipulada la fecha de pago del cliente con la fecha de ingresos del mismo', 2, 13, 'Porque de no cancelar en la fecha pactada se le generan intereses o gastos adicionales', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (69, 'Cuál es el porcentaje cobrado de interés si se pasa de la fecha pactada', 2, 13, '1.74 interés moratorio diario sobre valor mensual de la cuota pactada', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (70, 'Cuáles son los canales para consultar el estado de cartera y reportar pagos', 2, 13, '3124358411 y correo cartera1@celeusgroup.co o 322-2710636 correo cartera@celeusgroup.co ', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (71, '\"RECOMENDACIONES AL PERFILAR un CLIENTE PARA QUE NO DESISTA DE SU INVERSIÓN\n\"', 2, 13, '•	TIPO DE CONTRATO LABORAL, para saber si es una persona laboralmente estable.\r •	CLIENTE CREE QUE SOLO CON EL APARTAMENTO LE PRESTAN, debe saber que debe tener capacidad de endeudamiento, tener buenos ingresos.\r •	CLIENTES CON IGRESOS BAJOS, decirle que entre al proyecto con un familiar o cónyuge.\r •	LA ACTIVIDAD DEL RUT Y LA CAMARA DE COMERCIO DEBEN COINCIDIR, esto es causa de no aprobarse el crédito.\r •	Ubicar al cliente en un proyecto y un apartamento SEGÚN SUS INGRESOS.\r •	APARTAMENTOS CUYO PROPIETARIO FINAL ES DIFERENTE, en primera instancia siempre se negocia con la madre, pero al final quien va tramitar el préstamo es otra persona Un hijo u otro y esto afecta porque esa persona no se ha perfilado.\r •	MANIFESTARLE AL CLIENTE LA IMPORTANCIA DE ESTAR COMUNICADO CON LAS GESTORAS DE CARTERA Y ESCRITURACIÓN, hay clientes que no contestan llamadas ni WhatsApp de las gestoras, por tanto, no tendrán la oportunidad de orientarlos en el proceso.\r •	CLIENTE MANIFIESTA SI TIENE REPORTES EN DATACREDITO, decirle que es necesario que solucione esos reportes, porque de no ser así NO le van a aprobar el crédito.\r •	Clientes que reciban ingresos de arriendos que los legalicen haciendo consignaciones a sus cuentas y haciendo un contrato ante notaria de arriendo.\r •	Orientar al cliente para que no se endeude con gastos pequeños o no sirva de codeudor esto baja la capacidad de endeudamiento.\r •	Decirle al cliente que, si cambia de teléfono o dirección informe, porque es muy importante para nosotros estar en contacto con él.\r •	Aclarar sobre el punto de equilibrio, para que el cliente no se desanime con el pasar de los días.\r ', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (72, 'Como se cancelan los gastos notariales', 2, 13, 'Gastos notariales 100% comprador', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (73, 'En caso de no cumplir con los pagos en las fechas pactadas para la cuota inicial y/o la final ¿se genera algún interés?', 2, 13, 'Si, a partir del día siguiente de la fecha pactada se genera interés del 1,74% sobre el valor de la cuota.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (74, 'Se puede ceder el contrato durante su duración', 2, 13, 'Si se puede ceder en un 50 y/o 100%. El valor de la cesión tiene un costo de $80.000 por concepto de gastos administrativos.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (75, 'Qué documentos necesitamos para el trámite de un crédito hipotecario', 2, 13, 'Empleado: carta laboral, desprendible de pago de los últimos 3 meses, movimientos bancarios de los últimos tres meses\r Independiente: cámara de comercio antigüedad mínima dos años, declaración de renta, movimientos bancarios y RUT\r Pensionados: 3 desprendibles de pago, movimientos bancarios de los últimos tres meses y declaración de renta', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (76, 'A quién se debe notificar cuando un cliente va a cancelar de contado y va a aplicar a un bono de descuento', 2, 13, 'Se debe notificar a cartera para el pago y legalización para el inicio del proceso de escritura y entrega.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (77, 'Cuánto tiempo toma la escrituración y entrega del apartamento ,tanto  con crédito o de contado', 2, 13, 'Si usted ha adquirido un proyecto como TORRES DEL BOSQUE, DELTA PARK Y SILVER PARK.\r \r \r Tener presente:\r \r CREDITOS CON SUBSIDIOS:\r Cuando los créditos son con subsidio, se debe tener muy en cuenta, que estos se manejan a través de unos cupos, que cuando se acaban, se deben esperar un tiempo hasta que el ministerio de vivienda emita una nueva resolución para los nuevos cupos.\r \r La duración en tiempo para un desembolso de Crédito y entrega de un apartamento actualmente es de 47 días para créditos sin subsidios o lo NO VIS (si la resolución y cupos están disponibles).\r \r y con subsidio VIS se de tener en cuenta que el desembolso depende de la programación del ministerio de vivienda actualmente se están demorando entre 2 a 3 meses y hasta que no se desembolse no se pueden entregar el apartamento.\r \r LOS TIEMPOS\r \r 1.    Enviar los documentos al banco para el inicio del proceso que tiene una duración aproximada de 3 días.\r 2.    El banco se comunica con usted para informarle sobre los gastos de título y avaluó 2 días.\r 3.    El perito hace el avalúo que según programación del banco puede tardar hasta 1 semana.\r 4.    Realización de minuta por parte del abogado del banco puede demorar también hasta 1 semana.\r 5.    Envío de minuta a la notaria para la liquidación de los gastos de 1 a 2 días\r 6.    Posterior a esto usted cancela los gastos 1 a 2 días\r 7.    Usted se dirige a la notaria 2 a firmar escrituras. 1 día\r 8.	Luego la notaria envía la escritura al banco y a la constructora para la firma del representante legal. De 3 a 4 días.\r 9.    Ingreso de escritura a registro aproximadamente 15 días hábiles\r 10.  Desembolso de su crédito de 2 a 3 días.\r 11.  Entrega de su apartamento 1 semana después de su desembolso de acuerdo a programación de entrega.\r TOTAL, DIAS 47\r \r En el caso de los contados esta es la línea de tiempo real 34 días contando que las escrituras salgan de registro.\r \r Contado 34 días\r \r 1.    Envío de documentos a la notaria y elaboración de escrituras de 2 a 3 días\r 2.    notaria informa gastos notariales a la constructora 1 día\r 3.    la constructora se comunica con usted para el valor a pagar 1 día\r 4.    usted cancela los gastos notariales de 1 a 2 días\r 5.    usted firma escrituras en la notaria 2da    1 día\r 6.    notaria envía la escritura a la constructora para firma del representante legal 1 día\r 7.    constructora devuelve la escritura a notaria 1 día\r 8.    su escritura ingresa a registro 15 días.\r 9.    Se programa la entrega de su apartamento 1 día\r 10.  Se entrega su apartamento según programación de mercadeo hasta 8 días hábiles.\r TOTAL, DIAS 34', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (78, 'Cuales son los documentos a entregar en un contrato de inversión o promesa de compraventa', 2, 13, '•	Hoja de verificación de venta.\r •	Hoja de información.\r •	Contrato o promesa de compraventa según el proyecto.\r •	Carta de bienvenida e información del cliente.\r •	Copia cedula de ciudadanía, pasaporte vigente, o cedula de extranjería.\r •	Copia de aprobado bancario si es el caso para proyectos entrega inmediata.\r •	Tipología según proyecto\r •	Formato de referido si él es caso para previa valoración y autorización por Gerencia.\r •	Chelisk del cliente donde especifica si es empleado o independiente y soportes a entregar a futuro al momento de realizar el crédito .\r •	Formato de beneficio u obsequio entregado por la constructora el cual deberá entregarse totalmente diligenciado y firmado.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (79, 'Puntos importantes en un Contrato o promesa de compraventa', 2, 13, '•	Verificar que los datos de identificación del cliente estén correctos.\r •	Estado civil real del cliente\r •	Proyecto, número del apartamento, etapa y parqueadero (sobre todo si se toma uno adicional ya que es súper importante para la escrituración) \r •	Revisar la forma de pago, que las cuotas pactadas de la hoja de información sean las mismas del contrato (Ya que al crear las letras la persona encargada las realiza según la hoja de información y o el contrato)', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (80, 'Fechas estipuladas para entrega de contratos en Legalización', 2, 13, 'Los contratos serán entregados al área de legalización los días lunes 7.30 am  de cada semana a primera hora o al siguiente día en caso de ser festivo, de no ser así no serán recibidos y deberán esperar hasta la fecha de entrega de la semana siguiente.\r Los días 03 de cada mes serán las fechas máximas para las entregas de contratos dentro del mes, los contratos que no sean entregados o no sean corregidos antes de esta fecha no se legalizarán y por consiguiente no entraran dentro de la liquidación del mes. Es importante recalcar que la primera revisión del contrato la debe realizar el ejecutivo antes de imprimir el documento, con el fin de identificar posibles errores y corregir a tiempo, de manera que no se generen reprocesos y se puedan liquidar dentro de los tiempos establecidos.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (81, 'Tiempo máximo para la entrega de correcciones de contratos de ventas nuevas', 2, 13, 'Lo ideal es que NO lleguen errores, sin embargo, de presentarse, la gestora de legalización entregará al coordinador de ventas los contratos al día siguiente de la entrega de los mencionados contratos y estos podrán entregarse corregidos el día lunes de la siguiente semana de la siguiente semana o durante el mes. Para los contratos entregados en la última fecha extraordinaria, es decir los días 03 de cada mes, no será posible realizar dicha corrección de acuerdo a los tiempos límites para realizar liquidaciones, por tal motivo los entregados en fechas extraordinarias deberán estar muy bien diligenciados y sin errores, ya que, de no ser así, se legalizarán el siguiente mes.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (82, 'Distancia que  hay entre torre y torre de nogales ', 2, 13, 'Lateral: 18,5 mtrs.           Frontal: 40 mtrs. +14 mtrs en la nueva modificación = 54 mtrs', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (83, 'Cuántos ascensores cuenta cada proyecto', 2, 13, 'NG:   4 ascensores por torre en sus 4 etapas-en el lobby cuenta con 2 ascensores y en la zona de parqueaderos cuenta con 8 ascensores.\r DH: 3 ascensores por torre en su única etapa y 2 en el looby para subir a la plataforma .\r CANARIAS: Torre 1y 3 (4 ascensores) Torre 2 y 4 (3 ascensores) y 8 en zona de parqueaderos \r HOBBY : 3 ascensores por torre en su única etapa', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (84, 'Cuántas escaleras cuenta cada proyecto según su etapa y cuales cuentan con shut de basuras', 2, 13, 'NG: 2 escaleras por torre, ubicadas a los extremos de cada torre\r CC: 2 escaleras por torre, ubicadas a los extremos de cada torre\r DHP: 2 escaleras por torre, ubicadas a los extremos de cada torre\r HOBBY: 2 escaleras por torre, ubicadas a los extremos de cada torre', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (85, 'Enumere por proyecto con cuántos pisos de altura cuenta cada uno', 2, 13, 'NG:30 pisos DHP: 28 pisos CC: 29 en torre 1 y 3 ---30 en torre 2 y 4 HB 30 pisos', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (86, 'Con cuántas etapas cuenta cada proyecto', 2, 13, 'NG: 2 etapas DHP: 1 etapa CC: 2 etapas HB  1 etapa', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (87, 'Áreas exactas en mtrs2 según proyecto', 2, 13, 'NG:   66,72 - 63,87 - 68,63 – 71,07 -68,07 -127,74 M2\r DHP:  74,86  - 149,72  M2\r CC:  59,4- 61,4 -63,67- 121,9 -127,1 M2\r HB:  68,48-69-70,5-71,94-75-81,4 -145,5 M2', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (88, 'Cuántos apartamentos en general cuenta cada proyecto Celeus', 2, 13, 'NG: 928     DHP: 400   CANARIAS: 820 HB: 165', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (89, 'Áreas de los balcones según proyectos', 2, 13, 'NG=  1,5 X 0,8 -  3,5X 0,8 -  3,6 X 1,45 mts\r DHP=  2X1 \r CANARIAS= 1,4 X 0,7 - 2x1 - 3,4x 1 mts  en apto y 7,9x1 -2,1 x 1,5 m en ph', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (90, 'Medidas de la plataforma de dehesa park y distancia entre torre y torre ', 2, 13, '30 mtrs de frente x 63,5 de largo o fondo \nDistancia entre torre y torre de 33 MTRS\n', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (91, 'Plan referido 2021 actualmente cuenta con cinco líneas enumere los con su beneficio', 2, 13, 'SOCIO O REF EXTERNO $200.000 puede cambiar según campaña\n-SOCIO O REF INTERNO ANTES DE 30 DIAS $500.000 \n-SOCIO INTERNO DESPUES DE 30 DIAS $200.000 puede cambiar según campaña\n\nSegún campañas pueden modificarse los beneficios  ya establecidos ', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (92, 'Cuándo se entregan estos beneficios al referido ', 2, 13, 'Una vez cumplido el 10% de la cuota inicial del referido podrá reclamarlo en efectivo en la oficina, cumpliendo con las políticas del respectivo documento que se debe anexar al inicio de la compra', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (93, '3 actividades que se pueden realizar en cada uno de nuestros proyectos', 2, 13, 'NG: cine infantil y de adultos, zona de CrossFit, guardería infantil y canina, zona de picnic, parque infantil, salón social, piscinas, lavadero de vehículos.\r DHP: gym, guardería infantil, salón social, piscinas, zona de lectura etc.\r CC: salón de coworking -pista para trotar-zona bbq-zona picni-gim con terraza-zona infatiles-etc\r HB¬: Terraza meridio , área de yoga y meditacion , comedores vip , zon pet friendly, área para masajes ,gim y cardio, picsina infinita ,salón de juegos ,juegos acuáticos infantiles.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (94, 'Valor adicional de parqueaderos en nogales y HOBBY zona de visitantes', 2, 13, 'Zona de visitantes NG : $25.000.000  Zona de parqueaderos Hobby $25.000.000', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (95, 'Donde se encuentran ubicados los depósitos de Nogales', 2, 13, 'Están ubicados en los pisos 1 y 2 de cada torre del proyecto.', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (96, 'Cuando inicia contrucción el proyecto ', 2, 13, 'Una vez cumplido el punto de equilibrio, con un plazo de entrega a partir de la fecha de XXXX meses más 3 meses adicionales (Cláusula XII, XIV, XV).\r \r DHP=36       NG=38     CC= 38  HB= 38', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (97, 'Valor de las arras según proyecto', 2, 13, '$22.000.000 NG-DH-CC-HB', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (98, '¿Qué distancia hay entre torre y torre de Canarias en forma lateral y en forma frontal?', 2, 13, '22 mtr2 de forma lateral – y 54 mtrs. De torre a torre de frente', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (99, 'Qué altura manejan las torres de Nogales', 2, 13, '72 mts', 1616462171, NULL, 0);
INSERT INTO `documentacion` VALUES (100, 'Cuántos paneles solares tiene el club social ', 2, 13, 'Son 7 paneles y los beneficios son luz segura y confiable los 365 días del año, el costo de iluminación a $0 costo, alto rendimiento, durabilidad e inigualable estética, alta resistencia a cualquier clima, ahorro de energía hasta del 80% e implementación eco-técnica', 1616462171, NULL, 0);

-- ----------------------------
-- Table structure for empresa
-- ----------------------------
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE `empresa`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_empresa_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_empresa_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of empresa
-- ----------------------------
INSERT INTO `empresa` VALUES (1, 'Focus', 8, 1608008400);
INSERT INTO `empresa` VALUES (2, 'Celeus', 8, 1608008400);

-- ----------------------------
-- Table structure for examen
-- ----------------------------
DROP TABLE IF EXISTS `examen`;
CREATE TABLE `examen`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_examen_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_examen_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of examen
-- ----------------------------
INSERT INTO `examen` VALUES (1, 13, 1615131317);
INSERT INTO `examen` VALUES (2, 13, 1615131507);
INSERT INTO `examen` VALUES (3, 13, 1615132064);
INSERT INTO `examen` VALUES (4, 13, 1616428678);
INSERT INTO `examen` VALUES (5, 13, 1616461413);
INSERT INTO `examen` VALUES (6, 13, 1626302455);

-- ----------------------------
-- Table structure for gastos
-- ----------------------------
DROP TABLE IF EXISTS `gastos`;
CREATE TABLE `gastos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `tipogastos_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_gastos_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_gastos_tipogastos1`(`tipogastos_id`) USING BTREE,
  CONSTRAINT `fk_gastos_tipogastos1` FOREIGN KEY (`tipogastos_id`) REFERENCES `tipogastos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gastos_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gastos
-- ----------------------------
INSERT INTO `gastos` VALUES (1, 'Mercado/ Alimentación', 1608777218, 8, 1);
INSERT INTO `gastos` VALUES (2, 'Vivienda', 1608777218, 8, 1);
INSERT INTO `gastos` VALUES (3, 'Servicios (agua-luz-gas)', 1608777218, 8, 1);
INSERT INTO `gastos` VALUES (4, 'Servicios ( internet- tv-cable –telefonía móvil)', 1608777218, 8, 1);
INSERT INTO `gastos` VALUES (5, 'Transporte ( pasajes-parqueadero-gasolina)', 1608777218, 8, 1);
INSERT INTO `gastos` VALUES (6, 'Educación', 1608777218, 8, 1);
INSERT INTO `gastos` VALUES (7, 'Recreación', 1608777218, 8, 2);
INSERT INTO `gastos` VALUES (8, 'Ocasionales (vestuario-regalos)', 1608777218, 8, 2);
INSERT INTO `gastos` VALUES (9, 'Otros', 1608777218, 8, 2);
INSERT INTO `gastos` VALUES (10, 'Tarjetas de crédito', 1608777218, 8, 3);
INSERT INTO `gastos` VALUES (11, 'Seguros auto', 1608777218, 8, 3);
INSERT INTO `gastos` VALUES (12, 'Prestamos', 1608777218, 8, 3);
INSERT INTO `gastos` VALUES (13, 'Otros', 1608777218, 8, 3);

-- ----------------------------
-- Table structure for gastos_usuario
-- ----------------------------
DROP TABLE IF EXISTS `gastos_usuario`;
CREATE TABLE `gastos_usuario`  (
  `gastos_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `valor` int NULL DEFAULT NULL,
  `bitactivo` tinyint NULL DEFAULT NULL,
  INDEX `fk_gastos_has_usuario_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_gastos_has_usuario_gastos1_idx`(`gastos_id`) USING BTREE,
  CONSTRAINT `fk_gastos_has_usuario_gastos1` FOREIGN KEY (`gastos_id`) REFERENCES `gastos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gastos_has_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gastos_usuario
-- ----------------------------
INSERT INTO `gastos_usuario` VALUES (1, 15, 1626022244, 400000, 1);
INSERT INTO `gastos_usuario` VALUES (2, 15, 1626022244, 400000, 1);
INSERT INTO `gastos_usuario` VALUES (3, 15, 1626022244, 150000, 1);
INSERT INTO `gastos_usuario` VALUES (4, 15, 1626022244, 50000, 1);
INSERT INTO `gastos_usuario` VALUES (5, 15, 1626022244, 30000, 1);
INSERT INTO `gastos_usuario` VALUES (6, 15, 1626022244, 0, 1);
INSERT INTO `gastos_usuario` VALUES (7, 15, 1626022865, 1000000, 1);
INSERT INTO `gastos_usuario` VALUES (8, 15, 1626022865, 0, 1);
INSERT INTO `gastos_usuario` VALUES (9, 15, 1626022865, 0, 1);
INSERT INTO `gastos_usuario` VALUES (10, 15, 1626022874, 0, 1);
INSERT INTO `gastos_usuario` VALUES (11, 15, 1626022874, 0, 1);
INSERT INTO `gastos_usuario` VALUES (12, 15, 1626022874, 1000000, 1);
INSERT INTO `gastos_usuario` VALUES (13, 15, 1626022874, 0, 1);

-- ----------------------------
-- Table structure for habilidad
-- ----------------------------
DROP TABLE IF EXISTS `habilidad`;
CREATE TABLE `habilidad`  (
  `id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `descripcion` varchar(70) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_habilidad_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_habilidad_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of habilidad
-- ----------------------------
INSERT INTO `habilidad` VALUES (1, 1621732829, 'Mayor habilidad', 8);
INSERT INTO `habilidad` VALUES (2, 1621732829, 'Que debemos mejorar', 8);
INSERT INTO `habilidad` VALUES (3, 1621732829, 'Dificultad', 8);
INSERT INTO `habilidad` VALUES (4, 1621732829, 'Adquisicón', 8);

-- ----------------------------
-- Table structure for ingresos
-- ----------------------------
DROP TABLE IF EXISTS `ingresos`;
CREATE TABLE `ingresos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_ingresos_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_ingresos_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ingresos
-- ----------------------------
INSERT INTO `ingresos` VALUES (1, 'Sueldo', 1608777218, 8);
INSERT INTO `ingresos` VALUES (2, 'Comisiones', 1608777218, 8);
INSERT INTO `ingresos` VALUES (3, 'Otros', 1608777218, 8);

-- ----------------------------
-- Table structure for ingresos_usuario
-- ----------------------------
DROP TABLE IF EXISTS `ingresos_usuario`;
CREATE TABLE `ingresos_usuario`  (
  `ingresos_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `valor` int NULL DEFAULT NULL,
  `bitactivo` tinyint NULL DEFAULT NULL,
  INDEX `fk_ingresos_usuario_ingresos1_idx`(`ingresos_id`) USING BTREE,
  INDEX `fk_ingresos_usuario_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_ingresos_usuario_ingresos1` FOREIGN KEY (`ingresos_id`) REFERENCES `ingresos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingresos_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ingresos_usuario
-- ----------------------------
INSERT INTO `ingresos_usuario` VALUES (1, 15, 1626022900, 8500000, 0);
INSERT INTO `ingresos_usuario` VALUES (2, 15, 1626022900, 2000000, 1);
INSERT INTO `ingresos_usuario` VALUES (3, 15, 1626022900, 0, 1);
INSERT INTO `ingresos_usuario` VALUES (1, 15, 1626022909, 850000, 1);

-- ----------------------------
-- Table structure for interes
-- ----------------------------
DROP TABLE IF EXISTS `interes`;
CREATE TABLE `interes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of interes
-- ----------------------------

-- ----------------------------
-- Table structure for linea
-- ----------------------------
DROP TABLE IF EXISTS `linea`;
CREATE TABLE `linea`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `area_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_linea_area1_idx`(`area_id`) USING BTREE,
  INDEX `fk_linea_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_linea_area1` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_linea_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of linea
-- ----------------------------
INSERT INTO `linea` VALUES (1, 'Misión', 1610996926, 1, 8);
INSERT INTO `linea` VALUES (2, 'Visión', 1610996926, 1, 8);
INSERT INTO `linea` VALUES (3, 'Politicas', 1610996926, 1, 8);
INSERT INTO `linea` VALUES (4, 'Linea 1', 1610996926, 2, 8);
INSERT INTO `linea` VALUES (5, 'Linea 2', 1610996926, 2, 8);
INSERT INTO `linea` VALUES (6, 'Linea 3', 1610996926, 2, 8);
INSERT INTO `linea` VALUES (7, 'Linea 4', 1610996926, 2, 8);
INSERT INTO `linea` VALUES (8, 'Linea administrativa 1', 1619884472, 4, 12);

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `tipolog_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_log_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_log_tipolog1_idx`(`tipolog_id`) USING BTREE,
  CONSTRAINT `fk_log_tipolog1` FOREIGN KEY (`tipolog_id`) REFERENCES `tipolog` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 203 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for metas
-- ----------------------------
DROP TABLE IF EXISTS `metas`;
CREATE TABLE `metas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `eliminado` tinyint NULL DEFAULT 0,
  `rol_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_metas_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_metas_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of metas
-- ----------------------------
INSERT INTO `metas` VALUES (1, 'Ventas', 'El objetivo de esta meta es vender apartamentos a clientes x', 1612137270, 16, 0, NULL);
INSERT INTO `metas` VALUES (2, 'Prueba meta 1', 'El objetivo de esta meta es vender apartamentos a clientes x', 1612137384, 16, 0, NULL);
INSERT INTO `metas` VALUES (3, 'Prueba meta 2', 'El objetivo de esta meta es vender apartamentos a clientes x', 1612137387, 16, 0, NULL);
INSERT INTO `metas` VALUES (4, 'Prueba meta 3', 'El objetivo de esta meta es vender apartamentos a clientes x', 1612137390, 16, 0, NULL);
INSERT INTO `metas` VALUES (5, 'Prueba meta 4', 'El objetivo de esta meta es vender apartamentos a clientes x', 1612137392, 16, 0, NULL);
INSERT INTO `metas` VALUES (6, 'Prueba meta 5', 'El objetivo de esta meta es vender apartamentos a clientes x', 1612137395, 16, 0, NULL);
INSERT INTO `metas` VALUES (7, 'Vender apartamentos Nogales', 'El vendedor se compromete a vender apartamentos de nogales', 1612142006, 16, 0, NULL);
INSERT INTO `metas` VALUES (8, 'Venta zapatos', 'El vendedor se compromete a vender zapatos', 1616462625, 13, 0, NULL);
INSERT INTO `metas` VALUES (9, 'META PUNTO DE EQUILIBRIO ', 'NECESITAMOS LLEGAR A ALAS 100 UNIDADES\r\n\r\nle corresponde  50 a cads quipo durante 30 días', 1619643471, 12, 0, NULL);
INSERT INTO `metas` VALUES (10, 'Meta de prueba', 'Esto es una prueba ', 1619879144, 13, 0, NULL);
INSERT INTO `metas` VALUES (11, 'Meta prueba 2', 'Esto es una segunda prueba', 1619879190, 12, 0, NULL);
INSERT INTO `metas` VALUES (12, 'Meta prueba 3', 'Tercera prueba', 1619880009, 12, 0, NULL);
INSERT INTO `metas` VALUES (13, 'Meta 4', 'Esto es una segunda prueba', 1619883675, 12, 0, NULL);
INSERT INTO `metas` VALUES (14, 'Vender apartamentos (Anual)', 'Esta meta consiste en vender la cantidad propuesta de apartamentos.', 1624589138, 13, 0, NULL);
INSERT INTO `metas` VALUES (15, 'Vender apartamentos (Mensual)', 'Esta meta consiste en vender la cantidad propuesta de apartamentos en el mes.', 1624589149, 13, 0, NULL);

-- ----------------------------
-- Table structure for metas_realizadas
-- ----------------------------
DROP TABLE IF EXISTS `metas_realizadas`;
CREATE TABLE `metas_realizadas`  (
  `usuario_id` int NOT NULL,
  `metas_id` int NOT NULL,
  `cantidadrealizada` int NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `fecharealizacion` int NULL DEFAULT NULL,
  INDEX `fk_usuario_has_metas_metas2_idx`(`metas_id`) USING BTREE,
  INDEX `fk_usuario_has_metas_usuario2_idx`(`usuario_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of metas_realizadas
-- ----------------------------
INSERT INTO `metas_realizadas` VALUES (15, 6, 3, 1609459201, 1609459201);
INSERT INTO `metas_realizadas` VALUES (15, 6, 1, 1609459201, 1609459201);
INSERT INTO `metas_realizadas` VALUES (15, 6, 7, 16094592, 16094592);
INSERT INTO `metas_realizadas` VALUES (15, 8, 10, 1616462729, 1618444800);
INSERT INTO `metas_realizadas` VALUES (31, 14, 1, 1624968000, 1624881600);
INSERT INTO `metas_realizadas` VALUES (31, 15, 1, 1624968000, 1624881600);
INSERT INTO `metas_realizadas` VALUES (32, 14, 1, 1624968000, 1624881600);
INSERT INTO `metas_realizadas` VALUES (32, 15, 1, 1624968000, 1624881600);
INSERT INTO `metas_realizadas` VALUES (20, 14, 1, 1624968000, 1624881600);
INSERT INTO `metas_realizadas` VALUES (20, 15, 1, 1624968000, 1624881600);
INSERT INTO `metas_realizadas` VALUES (28, 14, 1, 1624708800, 1624622400);
INSERT INTO `metas_realizadas` VALUES (28, 15, 1, 1624708800, 1624622400);
INSERT INTO `metas_realizadas` VALUES (19, 14, 1, 1624622400, 1624536000);
INSERT INTO `metas_realizadas` VALUES (19, 15, 1, 1624622400, 1624536000);
INSERT INTO `metas_realizadas` VALUES (25, 14, 1, 1624536000, 1624449600);
INSERT INTO `metas_realizadas` VALUES (25, 15, 1, 1624536000, 1624449600);
INSERT INTO `metas_realizadas` VALUES (22, 14, 1, 1624536000, 1624449600);
INSERT INTO `metas_realizadas` VALUES (22, 15, 1, 1624536000, 1624449600);
INSERT INTO `metas_realizadas` VALUES (20, 14, 2, 1624536000, 1624449600);
INSERT INTO `metas_realizadas` VALUES (20, 15, 2, 1624536000, 1624449600);
INSERT INTO `metas_realizadas` VALUES (32, 14, 1, 1624449600, 1624363200);
INSERT INTO `metas_realizadas` VALUES (32, 15, 1, 1624449600, 1624363200);
INSERT INTO `metas_realizadas` VALUES (20, 14, 3, 1624449600, 1624363200);
INSERT INTO `metas_realizadas` VALUES (20, 15, 3, 1624449600, 1624363200);
INSERT INTO `metas_realizadas` VALUES (27, 14, 1, 1624363200, 1624276800);
INSERT INTO `metas_realizadas` VALUES (27, 15, 1, 1624363200, 1624276800);
INSERT INTO `metas_realizadas` VALUES (30, 14, 1, 1624190400, 1624104000);
INSERT INTO `metas_realizadas` VALUES (30, 15, 1, 1624190400, 1624104000);
INSERT INTO `metas_realizadas` VALUES (25, 14, 1, 1624190400, 1624104000);
INSERT INTO `metas_realizadas` VALUES (25, 15, 1, 1624190400, 1624104000);
INSERT INTO `metas_realizadas` VALUES (24, 14, 1, 1624104000, 1624017600);
INSERT INTO `metas_realizadas` VALUES (24, 15, 1, 1624104000, 1624017600);
INSERT INTO `metas_realizadas` VALUES (32, 14, 1, 1623931200, 1623844800);
INSERT INTO `metas_realizadas` VALUES (32, 15, 1, 1623931200, 1623844800);

-- ----------------------------
-- Table structure for moduloacademy
-- ----------------------------
DROP TABLE IF EXISTS `moduloacademy`;
CREATE TABLE `moduloacademy`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ruta` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `tipomodulo_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `linea_id` int NULL DEFAULT NULL,
  `examen_id` int NULL DEFAULT NULL,
  `eliminado` tinyint NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_moduloacademy_tipomodulo1_idx`(`tipomodulo_id`) USING BTREE,
  INDEX `fk_moduloacademy_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_moduloacademy_examen1`(`examen_id`) USING BTREE,
  CONSTRAINT `fk_moduloacademy_examen1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_moduloacademy_tipomodulo1` FOREIGN KEY (`tipomodulo_id`) REFERENCES `tipomodulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_moduloacademy_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moduloacademy
-- ----------------------------
INSERT INTO `moduloacademy` VALUES (4, 'Formación #1', NULL, 1612117313, 2, 16, 'Adquiere habilidades con los cursos, certificados y títulos en línea que ofrecen las universidades y las empresas más importantes del mundo.', 2, 4, 1);
INSERT INTO `moduloacademy` VALUES (10, 'Global Master of Public Health (GMPH)', 'https://www.coursera.org/degrees/global-mph-imperial', 1612136036, 1, 16, 'The Global Master of Public Health from Imperial College London is a highly respected online Master’s degree programme from one of the top 10 universities in the world (QS World University Rankings 2021). As a Global MPH student, you’ll study biostatistics, epidemiology, health systems, health economics, population health improvement, and more, while honing your research skills by exploring issues affecting your own community.', NULL, NULL, 0);
INSERT INTO `moduloacademy` VALUES (11, 'Políticas de la organización', NULL, 1612140751, 2, 16, 'El video trata sobre políticas y mas cosas ', 6, 1, 1);
INSERT INTO `moduloacademy` VALUES (12, '¿Qué es el mercadeo?', 'https://www.youtube.com/watch?v=E1G9tOQvCq0&ab_channel=CanalCEIPATV', 1612141167, 1, 16, 'Este video va a potencializar muchas cosas.....', NULL, NULL, 0);
INSERT INTO `moduloacademy` VALUES (13, '¿COMO HAGO PARA CONECTAR CON MI CLIENTE ?', 'https://assistcoespacio.slack.com/files/U01C3SB7G8L/F01KV1X1P7H/v._explicativo__v2.mp4', 1612647616, 1, 12, 'En el primer módulo tendrás la oportunidad de  que hablemos de uno de los puntos más importante en las ventas CONECTAR , la mayoría de nuestras ventas actualmente se están dando haciendo un registro de llamada a un prospecto, ya que este se registro en un canal digital , de allí parte el inicio de conocer y que tú cliente te quiera conocer y así lograr conectar con ese prospecto que  te va ha decir yo quiero eso y lo hare contigo.', NULL, NULL, 0);
INSERT INTO `moduloacademy` VALUES (14, 'Políticas de la organización 2', NULL, 1615131447, 2, 13, 'Adquiere habilidades con los cursos, certificados y títulos en línea que ofrecen las universidades y las empresas más importantes del mundo.', 1, 2, 0);
INSERT INTO `moduloacademy` VALUES (15, 'Políticas de la organización 3', NULL, 1615131976, 2, 13, 'Adquiere habilidades con los cursos, certificados y títulos en línea que ofrecen las universidades y las empresas más importantes del mundo.', 3, 3, 0);
INSERT INTO `moduloacademy` VALUES (21, 'Prueba curso', 'https://www.youtube.com/', 1616453668, 1, 13, 'Prueba de curso', NULL, NULL, 1);
INSERT INTO `moduloacademy` VALUES (22, 'BIENVENIDOS #VENDEDORESEXTRAORDINARIOS', 'https://youtu.be/UBOD6fPswDQ', 1616454235, 1, 13, 'Hola , le damos la bienvenida a la nueva era a la nueva forma de vender , dónde lograremos potencializar tu talento a través de la tecnología.', NULL, NULL, 0);
INSERT INTO `moduloacademy` VALUES (23, '¿Cómo conectar en la llamada?', 'https://youtu.be/6tDyTdk-LKA', 1616454457, 1, 13, 'No te llegan a la cita, no estás conectando  con tu cliente.', NULL, NULL, 0);
INSERT INTO `moduloacademy` VALUES (24, 'MISIÓN DE LA COMPAÑIA ', NULL, 1616454680, 2, 13, 'Aquí conocerás nuestra misión y como tu propósito debe guiarse bajo nuestra misión como compañía', 1, 6, 0);
INSERT INTO `moduloacademy` VALUES (25, 'Bienvenida a nuestra organización celeus', NULL, 1616458989, 2, 13, 'Aquí conocerás a detalle como tu propósito esta orientado a nuestra misión visión y política.', 1, 5, 0);
INSERT INTO `moduloacademy` VALUES (26, 'Potencializador para ventas', 'https://revista.profesionaldelainformacion.com/index.php/EPI/article/view/79259', 1616461629, 1, 13, 'Este articulo permitirá que ......', NULL, NULL, 0);

-- ----------------------------
-- Table structure for multimedia
-- ----------------------------
DROP TABLE IF EXISTS `multimedia`;
CREATE TABLE `multimedia`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `tipomultimedia_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `activo` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_multimedia_tipomultimedia1_idx`(`tipomultimedia_id`) USING BTREE,
  INDEX `fk_multimedia_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_multimedia_tipomultimedia1` FOREIGN KEY (`tipomultimedia_id`) REFERENCES `tipomultimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_multimedia_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of multimedia
-- ----------------------------
INSERT INTO `multimedia` VALUES (1, 'Grupo', 1608063879, 2, 8, 1);
INSERT INTO `multimedia` VALUES (2, 'Atención', 1608063879, 2, 8, 1);
INSERT INTO `multimedia` VALUES (3, 'Llamadas', 1608063879, 2, 8, 1);
INSERT INTO `multimedia` VALUES (4, '16121173139kuly664e5f9ct5.mp4', 1612117313, 3, 16, 1);
INSERT INTO `multimedia` VALUES (10, '1612136036t1ixmsdhsx760fz.jpg', 1612136036, 4, 16, 1);
INSERT INTO `multimedia` VALUES (11, '161213657800tq7ld2bv40u8y.jpg', 1612136578, 5, 16, 1);
INSERT INTO `multimedia` VALUES (12, '161213662379fjjvkg5tlceym.jpg', 1612136623, 5, 16, 1);
INSERT INTO `multimedia` VALUES (13, '1612138798k47b8vmiwgo6xr6.jpeg', 1612138798, 1, 15, 0);
INSERT INTO `multimedia` VALUES (14, '1612140751sk7jv6500eii1u0.mp4', 1612140751, 3, 16, 1);
INSERT INTO `multimedia` VALUES (15, '1612141167m7un774th4cnk8g.jpg', 1612141167, 4, 16, 1);
INSERT INTO `multimedia` VALUES (16, '16121417695wat1t1q3afoo35.jpg', 1612141769, 5, 16, 1);
INSERT INTO `multimedia` VALUES (17, '1612142721l5ku5yr2qfpldei.jpeg', 1612142721, 1, 15, 0);
INSERT INTO `multimedia` VALUES (18, '1614042942tkrqp2wr9n4jdhx.jpg', 1614042942, 7, 13, 1);
INSERT INTO `multimedia` VALUES (19, '1614043128jw9yklsrvzv9k96.jpg', 1614043128, 7, 13, 1);
INSERT INTO `multimedia` VALUES (20, '16151314479h0p5lcf93avy0c.mp4', 1615131447, 3, 13, 1);
INSERT INTO `multimedia` VALUES (21, '16151319762cb1roum5x10n2e.mp4', 1615131976, 3, 13, 1);
INSERT INTO `multimedia` VALUES (22, '1616428294qhtbe69f4rkpabw.jpg', 1616428294, 5, 13, 1);
INSERT INTO `multimedia` VALUES (23, '1616428441bai9ka35k6hps7x.jpg', 1616428441, 5, 13, 1);
INSERT INTO `multimedia` VALUES (24, '16164286535r99qvzzahfudyj.mp4', 1616428653, 3, 13, 1);
INSERT INTO `multimedia` VALUES (25, '1616428889brfh7kol8am3syu.docx', 1616428889, 7, 13, 1);
INSERT INTO `multimedia` VALUES (26, '16164503208d7fya6hllt41bv.png', 1616450320, 6, 13, 1);
INSERT INTO `multimedia` VALUES (27, '1616453668b5locmsbrfwx86j.jpg', 1616453668, 4, 13, 1);
INSERT INTO `multimedia` VALUES (28, '161645373106ggi628t6mhym1.jpeg', 1616453731, 6, 13, 1);
INSERT INTO `multimedia` VALUES (29, '1616454235ekvv1mwxuufwirn.jpg', 1616454235, 4, 13, 1);
INSERT INTO `multimedia` VALUES (30, '1616454457mo1ilyj9yleiq0y.jpg', 1616454457, 4, 13, 1);
INSERT INTO `multimedia` VALUES (31, '1616458989zp9h05y3zlpb2le.mp4', 1616458989, 3, 13, 1);
INSERT INTO `multimedia` VALUES (32, '1616461629u2xgzwgqt06oe0a.jpg', 1616461630, 4, 13, 1);
INSERT INTO `multimedia` VALUES (33, '1616462011xammzqb5ijale6c.pdf', 1616462011, 6, 13, 1);
INSERT INTO `multimedia` VALUES (34, '16164621711qx3tobcfjdv5e1.pdf', 1616462171, 7, 13, 1);
INSERT INTO `multimedia` VALUES (35, '1616462242l3fndumjckd157u.png', 1616462242, 5, 13, 1);
INSERT INTO `multimedia` VALUES (36, '1619642049a0jgz1gjhl8laxp.jpg', 1619642049, 1, 12, 1);
INSERT INTO `multimedia` VALUES (37, '16277427203ysu3tqgspsuf1x.jpg', 1627742720, 8, 15, 1);
INSERT INTO `multimedia` VALUES (38, '1627742743b0b0mfk9s2j1tti.jpg', 1627742743, 1, 15, 1);

-- ----------------------------
-- Table structure for multimedia_moduloacademy
-- ----------------------------
DROP TABLE IF EXISTS `multimedia_moduloacademy`;
CREATE TABLE `multimedia_moduloacademy`  (
  `multimedia_id` int NOT NULL,
  `moduloacademy_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`multimedia_id`, `moduloacademy_id`) USING BTREE,
  INDEX `fk_multimedia_has_moduloacademy_moduloacademy1_idx`(`moduloacademy_id`) USING BTREE,
  INDEX `fk_multimedia_has_moduloacademy_multimedia1_idx`(`multimedia_id`) USING BTREE,
  CONSTRAINT `fk_multimedia_has_moduloacademy_moduloacademy1` FOREIGN KEY (`moduloacademy_id`) REFERENCES `moduloacademy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_multimedia_has_moduloacademy_multimedia1` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of multimedia_moduloacademy
-- ----------------------------
INSERT INTO `multimedia_moduloacademy` VALUES (4, 4, 1612117313);
INSERT INTO `multimedia_moduloacademy` VALUES (10, 10, 1612136036);
INSERT INTO `multimedia_moduloacademy` VALUES (14, 11, 1612140751);
INSERT INTO `multimedia_moduloacademy` VALUES (15, 12, 1612141167);
INSERT INTO `multimedia_moduloacademy` VALUES (20, 14, 1615131447);
INSERT INTO `multimedia_moduloacademy` VALUES (21, 15, 1615131976);
INSERT INTO `multimedia_moduloacademy` VALUES (27, 21, 1616453668);
INSERT INTO `multimedia_moduloacademy` VALUES (29, 22, 1616454235);
INSERT INTO `multimedia_moduloacademy` VALUES (30, 23, 1616454457);
INSERT INTO `multimedia_moduloacademy` VALUES (31, 25, 1616458989);
INSERT INTO `multimedia_moduloacademy` VALUES (32, 26, 1616461630);

-- ----------------------------
-- Table structure for nivelestudio
-- ----------------------------
DROP TABLE IF EXISTS `nivelestudio`;
CREATE TABLE `nivelestudio`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nivelestudio` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_nivelestudio_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_nivelestudio_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of nivelestudio
-- ----------------------------
INSERT INTO `nivelestudio` VALUES (1, 'Primaria', 1608008400, 8);
INSERT INTO `nivelestudio` VALUES (2, 'Bachillerato', 1608008400, 8);
INSERT INTO `nivelestudio` VALUES (3, 'Tecnico', 1608008400, 8);
INSERT INTO `nivelestudio` VALUES (4, 'Profesional', 1608008400, 8);
INSERT INTO `nivelestudio` VALUES (5, 'Doctor', 1608008400, 8);
INSERT INTO `nivelestudio` VALUES (6, 'Magister', 1608008400, 8);

-- ----------------------------
-- Table structure for noticia
-- ----------------------------
DROP TABLE IF EXISTS `noticia`;
CREATE TABLE `noticia`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `multimedia_id` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `bitactivo` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_actualizacion_multimedia1_idx`(`multimedia_id`) USING BTREE,
  INDEX `fk_actualizacion_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_actualizacion_multimedia1` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_actualizacion_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of noticia
-- ----------------------------
INSERT INTO `noticia` VALUES (2, 'Noticia fin de año', 'The postgraduate programme’s curriculum is rooted in evidence-based research skills. You’ll learn from faculty who are shaping global policy, such as researchers who led the fight against the Ebola virus. Ranked as the UK’s most international university (Times Higher Education 2020), Imperial College London is committed to improving public health for people throughout the world.', 1612136578, 11, 16, 0);
INSERT INTO `noticia` VALUES (3, 'Prueba noticia ', 'The Global Master of Public Health from Imperial College London is a highly respected online Master’s degree programme from one of the top 10 universities in the world (QS World University Rankings 2021). As a Global MPH student, you’ll study biostatistics, epidemiology, health systems, health economics, population health improvement, and more, while honing your research skills by exploring issues affecting your own community.', 1612136623, 12, 16, 0);
INSERT INTO `noticia` VALUES (4, 'Registraduría suspende procesos revocatorios a la espera del concepto de Minsalud', 'Este domingo, la Registraduría anunció que los procesos de revocatorias quedan suspendidos hasta que reciba un concepto favorable por parte del Ministerio de Salud y con recomendaciones de bioseguridad, especialmente al momento de que se dé vía libre para la recolección de firmas.', 1612141769, 16, 16, 0);
INSERT INTO `noticia` VALUES (5, 'ANGELA de Cumpleaños', 'La noticia del Momento Angela esta de cumpleaños .\r\n\r\nasi que todos con tortas, regalos, cajas de chocolates .', 1616428294, 22, 13, 1);
INSERT INTO `noticia` VALUES (6, 'LANZAMIENTO', 'Ya pronto arrancaremos con el Lanzamiento de #TRENDY', 1616428441, 23, 13, 1);
INSERT INTO `noticia` VALUES (7, 'Feliz día de la mujer', 'Hace 30 años, cuando comenzaba a tomar forma la Asamblea Nacional Constituyente, todo estaba listo para que Fernando Carrillo asumiera la presidencia de la Comisión Quinta, encargada, entre otras, de tratar los asuntos económicos en la naciente carta política. Sin embargo, una petición a última hora llevó al exprocurador a estar en la Comisión Cuarta –relacionada con temas de justicia–. Ese hecho terminó por sellar el camino de quien luego llegó a ser ministro de Justicia y procurador General, y que en ese entonces era una de las cabezas del movimiento estudiantil que dio origen a la Séptima Papeleta.', 1616462242, 35, 13, 1);

-- ----------------------------
-- Table structure for opciones
-- ----------------------------
DROP TABLE IF EXISTS `opciones`;
CREATE TABLE `opciones`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `respuesta` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `bitCorrecta` tinyint NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `pregunta_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_opciones_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_opciones_pregunta1_idx`(`pregunta_id`) USING BTREE,
  CONSTRAINT `fk_opciones_pregunta1` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_opciones_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of opciones
-- ----------------------------
INSERT INTO `opciones` VALUES (1, 'Correcta', 1, 13, 1);
INSERT INTO `opciones` VALUES (2, 'Incorrecta', 0, 13, 1);
INSERT INTO `opciones` VALUES (3, 'Incorrecta 2', 0, 13, 1);
INSERT INTO `opciones` VALUES (4, 'Incorrecta', 0, 13, 2);
INSERT INTO `opciones` VALUES (5, 'Incorrecta 2', 0, 13, 2);
INSERT INTO `opciones` VALUES (6, 'Correcta', 1, 13, 2);
INSERT INTO `opciones` VALUES (7, 'Incorrecta 3', 0, 13, 2);
INSERT INTO `opciones` VALUES (8, 'Verdadero', 0, 13, 3);
INSERT INTO `opciones` VALUES (9, 'Falso', 1, 13, 3);
INSERT INTO `opciones` VALUES (10, 'Verdadero', 1, 13, 4);
INSERT INTO `opciones` VALUES (11, 'Falso', 0, 13, 4);
INSERT INTO `opciones` VALUES (12, 'No sabe no responde', 0, 13, 4);
INSERT INTO `opciones` VALUES (13, 'Corrrecta', 1, 13, 5);
INSERT INTO `opciones` VALUES (14, 'Incorrecta', 0, 13, 5);
INSERT INTO `opciones` VALUES (15, 'Incorrecta 3', 0, 13, 5);
INSERT INTO `opciones` VALUES (16, 'Incorrecta 2', 0, 13, 5);
INSERT INTO `opciones` VALUES (17, 'Google Noticias es un agregador y buscador de noticias automatizado que rastrea de forma constante la información de los principales medios de comunicación en línea.', 1, 13, 6);
INSERT INTO `opciones` VALUES (18, 'El sitio web de Google News, elaborado por Google, se actualiza cada 15 minutos y fue lanzado en versión beta en abril de 2002.', 0, 13, 6);
INSERT INTO `opciones` VALUES (19, 'Falso', 0, 13, 6);
INSERT INTO `opciones` VALUES (20, 'Infórmese aquí sobre las noticias de hoy en Colombia y el mundo, deportes, entretenimiento, salud, noticias de última hora y en vivo con Noticias Caracol.', 0, 13, 7);
INSERT INTO `opciones` VALUES (21, 'Amplia cobertura actualizada de noticias, agregada a partir de fuentes de noticias de todo el mundo por Google Noticias.', 1, 13, 7);
INSERT INTO `opciones` VALUES (22, 'crear innovadoras formas de vivir al alcance de algunos', 1, 13, 8);
INSERT INTO `opciones` VALUES (23, 'crear y mejorar la calidad de vida', 0, 13, 8);
INSERT INTO `opciones` VALUES (24, 'hacer la vida más fácil', 0, 13, 8);
INSERT INTO `opciones` VALUES (25, 'crear innovadoras formas de vivir al alcance de Todos', 0, 13, 8);
INSERT INTO `opciones` VALUES (26, 'Respuesta 1 ', 0, 13, 9);
INSERT INTO `opciones` VALUES (27, 'Falso', 0, 13, 9);
INSERT INTO `opciones` VALUES (28, 'Verdadero', 1, 13, 9);
INSERT INTO `opciones` VALUES (29, 'Esta no es', 0, 13, 10);
INSERT INTO `opciones` VALUES (30, 'Sigue intentando', 0, 13, 10);
INSERT INTO `opciones` VALUES (31, 'Esta es', 1, 13, 10);
INSERT INTO `opciones` VALUES (32, 'Crear innovadoras formas de vivir al alcance de todos', 1, 13, 11);
INSERT INTO `opciones` VALUES (33, 'crear calidad de vida', 0, 13, 11);
INSERT INTO `opciones` VALUES (34, 'innovar y predecir el futuro', 0, 13, 11);
INSERT INTO `opciones` VALUES (35, 'que todo sea más fácil ', 0, 13, 11);
INSERT INTO `opciones` VALUES (36, 'Hacer proyectos de vivienda', 0, 13, 11);
INSERT INTO `opciones` VALUES (37, 'hacer megadesarrollos', 0, 13, 11);
INSERT INTO `opciones` VALUES (38, 'hacer proyectos de apartamento', 0, 13, 11);
INSERT INTO `opciones` VALUES (39, 'un castor', 1, 13, 12);
INSERT INTO `opciones` VALUES (40, 'un avestruz', 0, 13, 12);
INSERT INTO `opciones` VALUES (41, 'un pajaro carpintero', 0, 13, 12);
INSERT INTO `opciones` VALUES (42, 'un pajaro', 0, 13, 12);

-- ----------------------------
-- Table structure for palabrasclave
-- ----------------------------
DROP TABLE IF EXISTS `palabrasclave`;
CREATE TABLE `palabrasclave`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `palabra` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `documentacion_iddocumentacion` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_palabrasclave_documentacion1_idx`(`documentacion_iddocumentacion`) USING BTREE,
  INDEX `fk_palabrasclave_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_palabrasclave_documentacion1` FOREIGN KEY (`documentacion_iddocumentacion`) REFERENCES `documentacion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_palabrasclave_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of palabrasclave
-- ----------------------------
INSERT INTO `palabrasclave` VALUES (9, 'diseño ', 2, 1616428889, 13);
INSERT INTO `palabrasclave` VALUES (10, 'silver park', 2, 1616428889, 13);
INSERT INTO `palabrasclave` VALUES (11, 'nogales club condominio', 2, 1616428889, 13);
INSERT INTO `palabrasclave` VALUES (12, 'construcción', 2, 1616428889, 13);
INSERT INTO `palabrasclave` VALUES (13, 'Nogales', 3, 1616462171, 13);
INSERT INTO `palabrasclave` VALUES (14, 'Carta Magna', 3, 1616462171, 13);

-- ----------------------------
-- Table structure for periodicidad
-- ----------------------------
DROP TABLE IF EXISTS `periodicidad`;
CREATE TABLE `periodicidad`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of periodicidad
-- ----------------------------
INSERT INTO `periodicidad` VALUES (1, 'Anuales', 1608777218);
INSERT INTO `periodicidad` VALUES (2, 'Mensuales', 1608777218);

-- ----------------------------
-- Table structure for plantrabajo
-- ----------------------------
DROP TABLE IF EXISTS `plantrabajo`;
CREATE TABLE `plantrabajo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `multimedia_id` int NOT NULL,
  `activo` tinyint NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_plantrabajo_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_plantrabajo_multimedia1`(`multimedia_id`) USING BTREE,
  CONSTRAINT `fk_plantrabajo_multimedia1` FOREIGN KEY (`multimedia_id`) REFERENCES `multimedia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_plantrabajo_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of plantrabajo
-- ----------------------------
INSERT INTO `plantrabajo` VALUES (1, 'cual es tu estrtaegia de seguimiento', 1610309572, 12, 1, 1);
INSERT INTO `plantrabajo` VALUES (2, '¿Cual es tu estrategia de llamadas?', 1612137711, 16, 2, 1);
INSERT INTO `plantrabajo` VALUES (3, '¿Cual es tu estrategia de Cierres?', 1612137721, 16, 1, 1);
INSERT INTO `plantrabajo` VALUES (4, '¿Cual es tu estrategia de conexión?ierres?', 1612137731, 16, 3, 1);
INSERT INTO `plantrabajo` VALUES (5, '¿Cómo estás organizando tu día? \r\nejemplo:\r\nLlego en la mañana verifico  mi puesto de trabajo,  ya tengo identificado  que reuniones tengo , pero debo realizar gestión de los nuevos que me llegaron .......', 1616425070, 12, 1, 1);
INSERT INTO `plantrabajo` VALUES (6, '¿Cómo estás organizando las llamadas? ejemplo: x,y,z', 1616462851, 13, 1, 1);
INSERT INTO `plantrabajo` VALUES (7, '¿Como es tu funell  de ventas?', 1619642778, 12, 1, 1);

-- ----------------------------
-- Table structure for pregunta
-- ----------------------------
DROP TABLE IF EXISTS `pregunta`;
CREATE TABLE `pregunta`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pregunta` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `usuario_id` int NOT NULL,
  `examen_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_pregunta_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_pregunta_examen1_idx`(`examen_id`) USING BTREE,
  CONSTRAINT `fk_pregunta_examen1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pregunta_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pregunta
-- ----------------------------
INSERT INTO `pregunta` VALUES (1, 'Pregunta 1', 13, 1, NULL);
INSERT INTO `pregunta` VALUES (2, 'Pregunta 2', 13, 1, NULL);
INSERT INTO `pregunta` VALUES (3, 'Pregunta 3 V F', 13, 1, NULL);
INSERT INTO `pregunta` VALUES (4, 'Verdadero Falso Pregunta 1', 13, 2, NULL);
INSERT INTO `pregunta` VALUES (5, 'Pregunta 2', 13, 2, NULL);
INSERT INTO `pregunta` VALUES (6, 'Un español medio pierde alrededor de tres calcetines al año. Si los multiplicamos por toda la población española, eso supone un total de unos 120 millones de calcetines perdidos. ¿Dónde están esos 120 millones de calcetines?', 13, 3, NULL);
INSERT INTO `pregunta` VALUES (7, 'Noticias Principales de Colombia y El Mundo: Últimas noticias en deportes, economía, política y tecnología.', 13, 3, NULL);
INSERT INTO `pregunta` VALUES (8, '¿cual es la misión de Celeus Group?', 13, 4, NULL);
INSERT INTO `pregunta` VALUES (9, 'Pregunta 1', 13, 5, NULL);
INSERT INTO `pregunta` VALUES (10, 'Pregunta 2', 13, 5, NULL);
INSERT INTO `pregunta` VALUES (11, '¿ cual es la misión de la compañia?', 13, 6, NULL);
INSERT INTO `pregunta` VALUES (12, '¿cual es la mascota de Celeus Group?', 13, 6, NULL);

-- ----------------------------
-- Table structure for respuesta
-- ----------------------------
DROP TABLE IF EXISTS `respuesta`;
CREATE TABLE `respuesta`  (
  `idrespuesta` int NOT NULL AUTO_INCREMENT,
  `pregunta_id` int NULL DEFAULT NULL,
  `opciones_id` int NULL DEFAULT NULL,
  `respuesta_examen_idrespuesta_examen` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`idrespuesta`) USING BTREE,
  INDEX `fk_respuesta_pregunta1_idx`(`pregunta_id`) USING BTREE,
  INDEX `fk_respuesta_opciones1_idx`(`opciones_id`) USING BTREE,
  INDEX `fk_respuesta_respuesta_examen1_idx`(`respuesta_examen_idrespuesta_examen`) USING BTREE,
  CONSTRAINT `fk_respuesta_opciones1` FOREIGN KEY (`opciones_id`) REFERENCES `opciones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_respuesta_pregunta1` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_respuesta_respuesta_examen1` FOREIGN KEY (`respuesta_examen_idrespuesta_examen`) REFERENCES `respuesta_examen` (`idrespuesta_examen`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of respuesta
-- ----------------------------
INSERT INTO `respuesta` VALUES (1, 4, 12, 1, 1615131757);
INSERT INTO `respuesta` VALUES (2, 5, 13, 1, 1615131757);
INSERT INTO `respuesta` VALUES (3, 6, 17, 2, 1615132153);
INSERT INTO `respuesta` VALUES (4, 7, 21, 2, 1615132153);
INSERT INTO `respuesta` VALUES (5, 6, 18, 3, 1616427284);
INSERT INTO `respuesta` VALUES (6, 7, 20, 3, 1616427284);
INSERT INTO `respuesta` VALUES (7, 9, 28, 4, 1616463338);
INSERT INTO `respuesta` VALUES (8, 10, 29, 4, 1616463338);

-- ----------------------------
-- Table structure for respuesta_examen
-- ----------------------------
DROP TABLE IF EXISTS `respuesta_examen`;
CREATE TABLE `respuesta_examen`  (
  `idrespuesta_examen` int NOT NULL AUTO_INCREMENT,
  `examen_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`idrespuesta_examen`) USING BTREE,
  INDEX `fk_respuesta_examen_examen1_idx`(`examen_id`) USING BTREE,
  INDEX `fk_respuesta_examen_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_respuesta_examen_examen1` FOREIGN KEY (`examen_id`) REFERENCES `examen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_respuesta_examen_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of respuesta_examen
-- ----------------------------
INSERT INTO `respuesta_examen` VALUES (1, 2, 15, 1615131757);
INSERT INTO `respuesta_examen` VALUES (2, 3, 15, 1615132153);
INSERT INTO `respuesta_examen` VALUES (3, 3, 15, 1616427284);
INSERT INTO `respuesta_examen` VALUES (4, 5, 15, 1616463338);

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_rol_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_rol_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rol
-- ----------------------------
INSERT INTO `rol` VALUES (1, 'Administrador', 1608008400, 8);
INSERT INTO `rol` VALUES (2, 'Director', 1608008400, 8);
INSERT INTO `rol` VALUES (3, 'Lider', 1608008400, 8);
INSERT INTO `rol` VALUES (4, 'Vendedor', 1608008400, 8);
INSERT INTO `rol` VALUES (5, 'Sin rol', 1608008400, 8);

-- ----------------------------
-- Table structure for sesion
-- ----------------------------
DROP TABLE IF EXISTS `sesion`;
CREATE TABLE `sesion`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechacreacion` int NULL DEFAULT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sesion
-- ----------------------------

-- ----------------------------
-- Table structure for tipogastos
-- ----------------------------
DROP TABLE IF EXISTS `tipogastos`;
CREATE TABLE `tipogastos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechacreacion` int NULL DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tipogastos_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_tipogastos_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipogastos
-- ----------------------------
INSERT INTO `tipogastos` VALUES (1, 1624074870, 'Gastos fijos', 8);
INSERT INTO `tipogastos` VALUES (2, 1624074870, 'Gastos Variables', 8);
INSERT INTO `tipogastos` VALUES (3, 1624074870, 'Pagos importantes', 8);

-- ----------------------------
-- Table structure for tipolog
-- ----------------------------
DROP TABLE IF EXISTS `tipolog`;
CREATE TABLE `tipolog`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipolog
-- ----------------------------

-- ----------------------------
-- Table structure for tipomodulo
-- ----------------------------
DROP TABLE IF EXISTS `tipomodulo`;
CREATE TABLE `tipomodulo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tipomodulo_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_tipomodulo_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipomodulo
-- ----------------------------
INSERT INTO `tipomodulo` VALUES (1, 'Curso', 1608063879, 8);
INSERT INTO `tipomodulo` VALUES (2, 'Formación', 1608063879, 8);

-- ----------------------------
-- Table structure for tipomultimedia
-- ----------------------------
DROP TABLE IF EXISTS `tipomultimedia`;
CREATE TABLE `tipomultimedia`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tipomultimedia_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_tipomultimedia_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipomultimedia
-- ----------------------------
INSERT INTO `tipomultimedia` VALUES (1, 'Imagen Perfil', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (2, 'Icono plan de trabajo', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (3, 'Video formación', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (4, 'Imagen cursos', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (5, 'Imagen noticia', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (6, 'Archivo actualizacion', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (7, 'Documentación', 1608063879, 8);
INSERT INTO `tipomultimedia` VALUES (8, 'Imagen inspiradora', 1608063879, 8);

-- ----------------------------
-- Table structure for top_plantrabajo
-- ----------------------------
DROP TABLE IF EXISTS `top_plantrabajo`;
CREATE TABLE `top_plantrabajo`  (
  `plantrabajo_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `top` tinyint NULL DEFAULT NULL,
  `respuesta` text CHARACTER SET big5 COLLATE big5_chinese_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  INDEX `fk_plantrabajo_has_usuario_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_plantrabajo_has_usuario_plantrabajo1_idx`(`plantrabajo_id`) USING BTREE,
  CONSTRAINT `fk_plantrabajo_has_usuario_plantrabajo1` FOREIGN KEY (`plantrabajo_id`) REFERENCES `plantrabajo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_plantrabajo_has_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of top_plantrabajo
-- ----------------------------
INSERT INTO `top_plantrabajo` VALUES (6, 15, NULL, 'Llego temprano , verifico los contactos de redes, de alli verifico  las tareas que tengo ', 1629851651);
INSERT INTO `top_plantrabajo` VALUES (4, 15, NULL, 'Para llamadas voy a contactar a personas mayores de 70 en Junio', 1629851655);

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `apellidos` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `alias` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechanacimiento` int NULL DEFAULT NULL,
  `celular` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechaincorporacion` int NULL DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `correo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `nivelestudio_id` int NULL DEFAULT NULL,
  `rol_id` int NULL DEFAULT NULL,
  `desactivado` tinyint NULL DEFAULT NULL,
  `empresa_id` int NULL DEFAULT NULL,
  `asignarclave` int NULL DEFAULT NULL,
  `token` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `perfil` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_usuario_nivelestudio1_idx`(`nivelestudio_id`) USING BTREE,
  INDEX `fk_usuario_rol1_idx`(`rol_id`) USING BTREE,
  INDEX `fk_usuario_empresa1_idx`(`empresa_id`) USING BTREE,
  CONSTRAINT `fk_usuario_empresa1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_nivelestudio1` FOREIGN KEY (`nivelestudio_id`) REFERENCES `nivelestudio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_rol1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (8, 'Administrador', 'Pruebas', 'adminprueba', 891666000, '123456789', 1459746000, 'Admin', 'prueba1@gmail.com', '62cc2d8b4bf2d8728120d052163a77df', 1608063879, NULL, 1, 0, 2, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (9, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '$2y$10$Cu0Kmx8yNNvRiiXuqWDnJ.nl8RZ/Xa3yYWEQq0rpaqSyvlXHvVAjm', 1608245566, NULL, NULL, NULL, NULL, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (10, NULL, NULL, NULL, NULL, NULL, NULL, 'prueba123', 'javier.acero@gmail.com', '$2y$10$p5KKD9uf0b2PiPciGNPfkOa0IWVFJtM3d/KL8BI135xNpMrfXGFXC', 1608245571, NULL, NULL, NULL, NULL, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (11, NULL, NULL, 'Administrador', 1609977600, '3006456781', 1609977600, 'Administrador', 'focusappadministrador@gmail.com', '$2y$10$RQ8xX12V0CIQrBn.YqhveODLBZ0t1xqjcToJ/3inn2Zc50NwtZ6I.', 1608249640, 4, 1, 0, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (12, 'Angela', 'Ordoñez', 'Angela', 636854400, '30179930373', 1484092800, 'AngelaO', 'angelaordonez1234@gmail.com', '$2y$10$FWZ7jnAr2CTbyGoxSGEMeOP6Yf4B2Fp7ks3IUwnp7O17rXX3/vSUC', 1608253468, NULL, 2, 0, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (13, 'David', 'Acero', NULL, NULL, NULL, NULL, 'David', 'vinci456_@hotmail.com', '$2y$10$AH0QYKD3clMel1jG5QbUXu3buhUA4j/UcfvHYzdMBTN7jy9zyPCmK', 1608253557, NULL, 3, 0, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (14, 'angela 2', 'Rodriguez', NULL, NULL, NULL, NULL, 'angero', 'mercadeo@celeusgroup.co', '$2y$10$W80u5GLLEsT8Gk5JI2j3zu0VekPVL2IX/peSG1A8bNajKk..Qd/Ma', 1610309637, NULL, 4, 0, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (15, 'Angela', 'Ordoñez', 'Ninja', 662342400, '3167651617', 1609459200, 'ajcero', 'javier.acero@focusasiste.com', '$2y$10$5VTlFhphLZDdPoLVMz5rL.siCI4hFAUpUJzvGvDX/M4gcOg2pZx.y', 1612114685, 4, 4, 0, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (16, 'David', 'Coordinador', 'davida0', 1609891200, '3006456781', 1609977600, 'davidcoordinador', 'dlaceroc@correo.udistrital.edu.co', '$2y$10$XB/3TLU6wZMauFv.fJq/DeZ0dDzlXG5WWkbXRY5JLrOYEbHvkTYNi', 1612115305, 4, 3, 0, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (17, 'David', 'Acero Prueba', NULL, NULL, NULL, NULL, 'david.acero', 'vinci456_@hotmail.com', '$2y$10$cEYQ2JcnbgYxhk1fctv6oOSx/w7VFFTRK4ZoAcg2BxcKQdw8daFAu', 1615130528, NULL, 5, NULL, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (18, 'David', 'Acero prueba 2', NULL, NULL, NULL, NULL, 'david.acero.prueba', 'ing.david.acero@gmail.com', '$2y$10$Fro0x4y2Q4wtijM4g80Aae8ztZYTKmmw/aMGmNzEzXfttlXowyV9e', 1615131070, NULL, 5, NULL, 1, NULL, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);
INSERT INTO `usuario` VALUES (35, 'LUIS HELY', 'CASTELLANOS RODRIGUEZ', NULL, NULL, NULL, NULL, 'luicas03', 'luishely1986@hotmail.com', '62cc2d8b4bf2d8728120d052163a77df', 1637204176, NULL, 2, 0, 2, 0, NULL, 'assets/images/avatars/brian-hughes.jpg', NULL);

-- ----------------------------
-- Table structure for usuario_area
-- ----------------------------
DROP TABLE IF EXISTS `usuario_area`;
CREATE TABLE `usuario_area`  (
  `usuario_id` int NOT NULL,
  `area_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`usuario_id`, `area_id`) USING BTREE,
  INDEX `fk_usuario_has_area_area1_idx`(`area_id`) USING BTREE,
  INDEX `fk_usuario_has_area_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_area_area1` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_area_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_area
-- ----------------------------

-- ----------------------------
-- Table structure for usuario_habilidades
-- ----------------------------
DROP TABLE IF EXISTS `usuario_habilidades`;
CREATE TABLE `usuario_habilidades`  (
  `usuario_id` int NOT NULL,
  `habilidad_id` int NOT NULL,
  `activo` tinyint NULL DEFAULT NULL,
  `respuesta` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  INDEX `fk_usuario_has_habilidad_habilidad1_idx`(`habilidad_id`) USING BTREE,
  INDEX `fk_usuario_has_habilidad_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_habilidad_habilidad1` FOREIGN KEY (`habilidad_id`) REFERENCES `habilidad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_habilidad_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_habilidades
-- ----------------------------
INSERT INTO `usuario_habilidades` VALUES (15, 1, 1, 'crear ideas de cierre', 1626022102);
INSERT INTO `usuario_habilidades` VALUES (15, 3, 1, 'escuchar', 1626022102);
INSERT INTO `usuario_habilidades` VALUES (15, 2, 1, 'escuchar para poder adelantarme en la negociación', 1626022102);
INSERT INTO `usuario_habilidades` VALUES (15, 4, 1, 'escuchar', 1626022102);
INSERT INTO `usuario_habilidades` VALUES (12, 1, 1, 'crear ideas de cierre', 1626300458);
INSERT INTO `usuario_habilidades` VALUES (12, 3, 1, 'escuchar', 1626300458);
INSERT INTO `usuario_habilidades` VALUES (12, 2, 1, 'escuchar para poder adelantarme en la negociación', 1626300458);
INSERT INTO `usuario_habilidades` VALUES (12, 4, 1, 'escuchar', 1626300458);

-- ----------------------------
-- Table structure for usuario_has_plantrabajo
-- ----------------------------
DROP TABLE IF EXISTS `usuario_has_plantrabajo`;
CREATE TABLE `usuario_has_plantrabajo`  (
  `usuario_id` int NOT NULL,
  `plantrabajo_id` int NOT NULL,
  `respuesta` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `activo` tinyint NULL DEFAULT 1,
  INDEX `fk_usuario_has_plantrabajo_plantrabajo1_idx`(`plantrabajo_id`) USING BTREE,
  INDEX `fk_usuario_has_plantrabajo_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_plantrabajo_plantrabajo1` FOREIGN KEY (`plantrabajo_id`) REFERENCES `plantrabajo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_plantrabajo_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_has_plantrabajo
-- ----------------------------
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 4, 'llamar mañana', 1612137896, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 3, 'cambio de discursiso en llamda, demostración y negociación', 1616455567, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 4, 'llamar mañanallamar tarde', 1612137901, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 4, 'Para llamadas voy a contactar a personas mayores de 70 en Junio', 1612142511, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (16, 5, NULL, 1616426819, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (16, 3, NULL, 1616426865, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 4, 'Voy a reestructurar mi discurso ,  con palabras claves en la llamada como....', 1616455569, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 6, 'feefe', 1619648905, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 3, 'ssssss', 1619648920, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 6, 'Llego temprano , verifico los contactos de redes, de alli verifico  las tareas que tengo ', 1626036310, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (13, 6, NULL, 1626390473, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (13, 4, NULL, 1626390473, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (13, 3, NULL, 1626390497, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (13, 1, NULL, 1626390507, 1);
INSERT INTO `usuario_has_plantrabajo` VALUES (15, 6, 'funcionando preguntar por ue realizp', 1630272149, 1);

-- ----------------------------
-- Table structure for usuario_interes
-- ----------------------------
DROP TABLE IF EXISTS `usuario_interes`;
CREATE TABLE `usuario_interes`  (
  `usuario_id` int NOT NULL,
  `interes_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`usuario_id`, `interes_id`) USING BTREE,
  INDEX `fk_usuario_has_interes_interes1_idx`(`interes_id`) USING BTREE,
  INDEX `fk_usuario_has_interes_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_interes_interes1` FOREIGN KEY (`interes_id`) REFERENCES `interes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_interes_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_interes
-- ----------------------------

-- ----------------------------
-- Table structure for usuario_metas
-- ----------------------------
DROP TABLE IF EXISTS `usuario_metas`;
CREATE TABLE `usuario_metas`  (
  `usuario_id` int NOT NULL,
  `metas_id` int NOT NULL,
  `fechainicio` int NULL DEFAULT NULL,
  `fechafin` int NULL DEFAULT NULL,
  `cantidadpropuesta` int NULL DEFAULT NULL,
  `bitcompletado` tinyint NULL DEFAULT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `periodicidad_id` int NULL DEFAULT NULL,
  `beneficios_id` int NULL DEFAULT NULL,
  `activo` tinyint NULL DEFAULT 1,
  INDEX `fk_usuario_has_metas_metas1_idx`(`metas_id`) USING BTREE,
  INDEX `fk_usuario_has_metas_usuario1_idx`(`usuario_id`) USING BTREE,
  INDEX `fk_metas_periodicidad1`(`periodicidad_id`) USING BTREE,
  INDEX `fk_usuario_metas_beneficios1`(`beneficios_id`) USING BTREE,
  CONSTRAINT `fk_metas_periodicidad1` FOREIGN KEY (`periodicidad_id`) REFERENCES `periodicidad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_metas_metas1` FOREIGN KEY (`metas_id`) REFERENCES `metas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_metas_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_metas_beneficios1` FOREIGN KEY (`beneficios_id`) REFERENCES `beneficios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_metas
-- ----------------------------
INSERT INTO `usuario_metas` VALUES (15, 1, 1609545600, 1640908800, 80, NULL, 1612137361, 1, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 2, 1609459200, 1611878400, 10, NULL, 1612137487, 2, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 3, 1609459200, 1611878400, 10, NULL, 1612137472, 2, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 4, 1609459200, 1611878400, 10, NULL, 1612137454, 1, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 5, 1609459200, 1611878400, 5, NULL, 1612137447, 1, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 6, 1609459200, 1611878400, 5, NULL, 1612137417, 2, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 7, 1609459200, 1612051200, 20, NULL, 1612142075, 2, NULL, 1);
INSERT INTO `usuario_metas` VALUES (16, 7, 1609459200, 1622505600, 30, NULL, 1616426917, 2, NULL, 1);
INSERT INTO `usuario_metas` VALUES (16, 4, 1617235200, 1617235200, 5, NULL, 1616426968, 2, NULL, 1);
INSERT INTO `usuario_metas` VALUES (15, 8, 1617235200, 1619827200, 20, NULL, 1616462673, 2, NULL, 1);

-- ----------------------------
-- Table structure for usuario_moduloacademy
-- ----------------------------
DROP TABLE IF EXISTS `usuario_moduloacademy`;
CREATE TABLE `usuario_moduloacademy`  (
  `usuario_id` int NOT NULL,
  `moduloacademy_id` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  `calificacion` int NULL DEFAULT NULL,
  `fechacalificacion` int NULL DEFAULT NULL,
  `activo` tinyint NULL DEFAULT 1,
  PRIMARY KEY (`usuario_id`, `moduloacademy_id`) USING BTREE,
  INDEX `fk_usuario_has_moduloacademy_moduloacademy1_idx`(`moduloacademy_id`) USING BTREE,
  INDEX `fk_usuario_has_moduloacademy_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_moduloacademy_moduloacademy1` FOREIGN KEY (`moduloacademy_id`) REFERENCES `moduloacademy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_moduloacademy_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_moduloacademy
-- ----------------------------
INSERT INTO `usuario_moduloacademy` VALUES (14, 22, 1628554899, NULL, NULL, 1);
INSERT INTO `usuario_moduloacademy` VALUES (14, 23, 1628554771, NULL, NULL, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 4, 1612117404, 5, 1612134387, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 10, 1612136052, 5, 1616408942, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 11, 1612140781, 5, 1612653702, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 12, 1612141203, 4, 1629908400, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 13, 1616453619, NULL, NULL, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 14, 1615131522, 2, 1616429392, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 15, 1615132096, 4, 1629908378, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 21, 1616453675, NULL, NULL, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 22, 1616454250, 4, 1628553431, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 23, 1616454466, 5, 1628553444, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 24, 1626301503, NULL, NULL, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 25, 1616461470, 5, 1616463314, 1);
INSERT INTO `usuario_moduloacademy` VALUES (15, 26, 1616461651, 3, 1629908419, 1);

-- ----------------------------
-- Table structure for usuario_padre
-- ----------------------------
DROP TABLE IF EXISTS `usuario_padre`;
CREATE TABLE `usuario_padre`  (
  `usuario_id` int NOT NULL,
  `usuario_id_padre` int NOT NULL,
  `fechacreacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`usuario_id`, `usuario_id_padre`) USING BTREE,
  INDEX `fk_usuario_has_usuario_usuario2_idx`(`usuario_id_padre`) USING BTREE,
  INDEX `fk_usuario_has_usuario_usuario1_idx`(`usuario_id`) USING BTREE,
  CONSTRAINT `fk_usuario_has_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_usuario_usuario2` FOREIGN KEY (`usuario_id_padre`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario_padre
-- ----------------------------

-- ----------------------------
-- Procedure structure for sp_admin_academy
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_admin_academy`;
delimiter ;;
CREATE PROCEDURE `sp_admin_academy`(IN ve_moduloacademy_id INT
																		,IN ve_nombre VARCHAR(250)
																		,IN ve_ruta VARCHAR(100)
																		,IN ve_tipomodulo_id INT
																		,IN ve_descripcion TEXT(3000)
																		,IN ve_linea_id INT
																		,IN ve_examen_id INT
																		,IN ve_usuario_idregistra INT
																		,OUT s_mensajeerror TEXT(1000))
sp: BEGIN 
  
-- 1. se declaran variables locales para optimizacion                
DECLARE vi_control INT;
DECLARE vi_fechaproceso DATETIME;
DECLARE vi_tipo VARCHAR(2);

SET vi_control=0;
SET vi_fechaproceso=NOW();
SET vi_tipo='IN';


CREATE TEMPORARY TABLE tempo_vendedores_asignar as
SELECT 1 usuario_id;

-- Control de Parametro para la variable Tipo 
IF vi_tipo NOT IN ('IN','PS','AC') THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Tipo Parametro No Valido.. Valores Permitidos IN, PS, AC.. Intentar nuevamente"}';
LEAVE sp;
END IF;

-- Bloque Creacion Usuario
IF vi_tipo='IN' THEN -- Asignar nuevos cursos

IF IFNULL(ve_moduloacademy_id,0)<>0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Modulo Academy Id Solo Aplica Para Actualizacion.. Intentar nuevamente"}';
LEAVE sp;
END IF;


IF IFNULL(ve_nombre,'')='' OR IFNULL(ve_ruta,'')='' OR IFNULL(ve_descripcion,'')='' THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Nombre y/o Ruta y/o Descripcion Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM tipomodulo WHERE id=ve_tipomodulo_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Tipo Modulo Id no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;

SET vi_control=(SELECT COUNT(1) FROM linea WHERE id=ve_linea_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Linea Id no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (id=vi_usuario_idregistra) );
		  
IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Usuario Id Registra no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;

		  
-- Insertamos el Registro Nuevo
INSERT INTO moduloacademy (nombre,ruta,fechacreacion,tipomodulo_id,usuario_id,descripcion
												   ,linea_id,examen_id,eliminado)
SELECT ve_nombre,ve_ruta,UNIX_TIMESTAMP(vi_fechaproceso),ve_tipomodulo_id,ve_usuario_idregistra,ve_descripcion
			 ,ve_linea_id,ve_examen_id,0;
SET vi_control=(SELECT id FROM moduloacademy WHERE nombre=ve_nombre 
							 AND usuario_id=ve_usuario_idregistra
							 AND fechacreacion=UNIX_TIMESTAMP(vi_fechaproceso)
							 );

SET s_mensajeerror=CONCAT('{"moduloacademy_id":,',vi_control,'"codigo":0,"mensaje":"Curso Creado Correctamente..."}');

LEAVE sp;
END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_admin_academy_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_admin_academy_usuario`;
delimiter ;;
CREATE PROCEDURE `sp_admin_academy_usuario`(IN ve_moduloacademy_id INT,IN ve_json TEXT(3000)
																    ,IN ve_tipo varchar(2), IN ve_usuario_idregistra INT
																		,OUT s_mensajeerror TEXT(1000))
sp: BEGIN 
  
-- 1. se declaran variables locales para optimizacion                
DECLARE vi_control INT;
DECLARE vi_fechaproceso DATETIME;
DECLARE vi_tipo VARCHAR(2);

SET vi_control=0;
SET vi_tipo='IN';


DROP TEMPORARY TABLE IF EXISTS tempo_vendedores_asignar;
CREATE TEMPORARY TABLE tempo_vendedores_asignar as
SELECT 1 usuario_id;

-- Control de Parametro para la variable Tipo 

IF vi_tipo NOT IN ('IN','PS','AC') THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Tipo Parametro No Valido.. Valores Permitidos IN, PS, AC.. Intentar nuevamente"}';
LEAVE sp;
END IF;

-- Bloque Creacion Usuario
IF vi_tipo='IN' THEN -- Asignar nuevos cursos

IF IFNULL(ve_moduloacademy_id,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Modulo Academy Id Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


IF IFNULL(ve_usuario_idregistra,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Usuario Registra Id Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM moduloacademy WHERE id=ve_moduloacademy_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Modulo Academy Id no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (id=ve_usuario_idregistra) );
		  
IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Usuario Id Registra no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;

		  
-- Insertamos el Registro Nuevo
INSERT INTO usuario_moduloacademy (usuario_id,moduloacademy_id,fechacreacion,activo)
SELECT usuario_id,ve_moduloacademy_id,UNIX_TIMESTAMP(SYSDATE()),1 estado
FROM tempo_vendedores_asignar;
		
SET s_mensajeerror='{"codigo":0,"mensaje":"Curso Asignado Correctamente..."}';

LEAVE sp;
END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_admin_respuesta_examen
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_admin_respuesta_examen`;
delimiter ;;
CREATE PROCEDURE `sp_admin_respuesta_examen`(IN ve_examen_id INT
																							,IN ve_califacion INT
																							,IN ve_numero_pregunta INT
																						 ,IN ve_usuario_idregistra INT
																						 ,IN ve_json TEXT(3000)
																						 ,OUT s_mensajeerror TEXT(1000))
sp: BEGIN 
  
-- 1. se declaran variables locales para optimizacion                
DECLARE vi_control INT;
DECLARE vi_fechaproceso DATETIME;
DECLARE vi_ponderacion INT(11);
DECLARE _list MEDIUMTEXT; 
DECLARE _next TEXT DEFAULT NULL; 
DECLARE _next_anterior TEXT DEFAULT NULL; 
DECLARE _nextlen INT DEFAULT NULL; 
DECLARE _value TEXT DEFAULT NULL;

-- Guardamos los Datos a evaluar
SET vi_control=0;
SET vi_ponderacion=0;

SET vi_ponderacion=(ve_califacion/ve_numero_pregunta)*100;

SET _list=REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(ve_json,'[{',''),'"',''),'},{',','),'}]',''),'pregunta_id:',''),'opciones_id:',''),' ','');

-- Creamos la tabla temporal 
DROP TEMPORARY TABLE IF EXISTS temporepuestaexamen;
CREATE TEMPORARY TABLE temporepuestaexamen (pregunta_id INT(11),opciones_id INT(11));


iterator: 
LOOP 
    -- exit the loop if the list seems empty or was null; 
    -- this extra caution is necessary to avoid an endless loop in the proc. 
    IF LENGTH(TRIM(_list)) = 0 OR _list IS NULL THEN 
    LEAVE iterator; 
    END IF; 
    
    SET vi_control=vi_control+1;
    
    -- capture the next value from the list 
    SET _next = SUBSTRING_INDEX(_list,',',1); 
    SET _nextlen = LENGTH(_next); 
    SET _value = TRIM(_next); 
    
    -- Validamos si es impar
    if mod(vi_control,2) = 0 then
    -- insert the extracted value into the target table 
    INSERT INTO temporepuestaexamen (pregunta_id,opciones_id) VALUES (_next_anterior,_next); 
    end if;
    
    SET _list = INSERT(_list,1,_nextlen + 1,''); 
    SET _next_anterior=_next;

END LOOP; 


IF IFNULL(ve_examen_id,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Examen Id Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


IF IFNULL(ve_usuario_idregistra,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Usuario Registra Id Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


IF IFNULL(ve_numero_pregunta,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Cantidad Preguntas Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;

IF IFNULL(ve_califacion,-1)=-1 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Calificacion Vacia.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM examen WHERE id=ve_examen_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Examen Id no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (id=ve_usuario_idregistra) );
		  
IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Usuario Id Registra no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM temporepuestaexamen);
		  
IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Datos de Pregunta y Respuesta Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control= (SELECT COUNT(1) 
								FROM temporepuestaexamen tr 
								WHERE NOT EXISTS (SELECT 1 FROM opciones o  
																	WHERE o.pregunta_id=tr.pregunta_id AND o.id=tr.opciones_id
																	)
								);

IF vi_control>0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Algunas Pregunta y Respuesta No Existe en la Tabla de Referencia.. Intentar nuevamente"}';
LEAVE sp;
END IF;

-- Creamos la respuesta del examen
INSERT INTO respuesta_examen (examen_id,usuario_id,fechacreacion)
SELECT ve_examen_id,ve_usuario_idregistra,UNIX_TIMESTAMP(vi_fechaproceso);

-- Calculamos el Id de la respuesta 
SET vi_control=(SELECT id FROM respuesta_examen 
							 WHERE examen_id=ve_examen_id 
							 AND usuario_id=ve_usuario_idregistra AND fechacreacion=UNIX_TIMESTAMP(vi_fechaproceso)
							 );

-- Insertamos la respuesta para cada pregunta
INSERT INTO respuesta (pregunta_id,opciones_id,respuesta_examen_idrespuesta_examen,fechacreacion)
SELECT pregunta_id,opciones_id,vi_control respuesta_examen_idrespuesta_examen,UNIX_TIMESTAMP(vi_fechaproceso)
FROM temporepuestaexamen;

-- Actualizamos la calificacion
UPDATE usuario_moduloacademy um INNER JOIN moduloacademy ma ON um.moduloacademy_id=ma.id
SET um.calificacion= CASE WHEN IFNULL(um.calificacion,-1) < ve_calificacion THEN ve_calificacion ELSE IFNULL(um.calificacion,0) END
		,um.fechacalificacion=CASE WHEN IFNULL(um.calificacion,-1) < ve_calificacion THEN UNIX_TIMESTAMP(vi_fechaproceso) ELSE um.fechacalificacion END
WHERE um.examen_id=ve_examen_id AND um.usuario_id=ve_usuario_idregistra;


-- Mensaje de Resultado
SET s_mensajeerror=CASE WHEN vi_ponderacion < 70 THEN CONCAT('{"codigo":0,"mensaje":"Examen No Aprobado!!!, Calificacion: ',ve_califacion,' ::: Te invitamos a realizarlo nuevamente, cuentas con tres (3) intentos, animo y mejora tu calificación!!!..."}')
															ELSE CONCAT('{"codigo":0,"mensaje":"Examen Aprobado!!!, Califacion: ',ve_califacion,' ::: Felicitaciones!!!, Ahora eres todo un Experto!!..."}') END;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_admin_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_admin_usuario`;
delimiter ;;
CREATE PROCEDURE `sp_admin_usuario`(IN ve_json TEXT(3000)
																    ,IN vi_tipo varchar(2), OUT s_mensajeerror TEXT(1000))
sp: BEGIN 
  
-- 1. se declaran variables locales para optimizacion                
DECLARE vi_control INT;
DECLARE ve_usuario_id INT;
DECLARE ve_empresa_id INT;
DECLARE ve_rol_id INT;
DECLARE ve_apellidos VARCHAR(50);
DECLARE ve_nombres VARCHAR(50);
DECLARE ve_email VARCHAR(70);
DECLARE ve_login VARCHAR(50);
DECLARE ve_clave VARCHAR(50);
DECLARE ve_descripcion text;
DECLARE ve_perfil varchar(100);
DECLARE ve_usuario_idregistra INT;
DECLARE ve_fechanacimiento datetime;
DECLARE ve_celular varchar(10);
DECLARE ve_nivelestudio_id INT;

SET vi_control=0;

-- Control de Parametro para la variable Tipo 
IF vi_tipo NOT IN ('IN','PS','AC') THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Tipo Parametro No Valido.. Valores Permitidos IN, PS, AC.. Intentar nuevamente"}';
LEAVE sp;
END IF;

-- Creamos la Temporal del registro
DROP TEMPORARY TABLE IF EXISTS tempo_json_in;
CREATE TEMPORARY TABLE tempo_json_in (atributtes JSON NOT NULL);

-- Insertamos la Data a Tratar
INSERT INTO tempo_json_in VALUES (ve_json);

-- Extramos las variables del objeto Usuario
SET ve_usuario_id=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.usuario_id'),'"','') FROM tempo_json_in);
SET ve_empresa_id=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.empresa_id'),'"','') FROM tempo_json_in);
SET ve_rol_id=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.rol_id'),'"','') FROM tempo_json_in);
SET ve_apellidos=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.apellidos'),'"','') FROM tempo_json_in);
SET ve_nombres=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.nombres'),'"','') FROM tempo_json_in);
SET ve_email=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.email'),'"','') FROM tempo_json_in);
SET ve_login=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.login'),'"','') FROM tempo_json_in);
SET ve_clave=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.clave'),'"','') FROM tempo_json_in);
SET ve_usuario_idregistra=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.usuario_idregistra'),'"','') FROM tempo_json_in);
SET ve_descripcion=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.descripcion'),'"','') FROM tempo_json_in);
SET ve_perfil=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.perfil'),'"','') FROM tempo_json_in);
SET ve_fechanacimiento=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.fechanacimiento'),'"','') FROM tempo_json_in);
SET ve_celular=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.celular'),'"','') FROM tempo_json_in);
SET ve_nivelestudio_id=(SELECT REPLACE(JSON_EXTRACT(atributtes,'$.usuario.nivelestudio_id'),'"','') FROM tempo_json_in);


-- Bloque Creacion Usuario
IF vi_tipo='PS' THEN -- Para Actualizar Password 

	IF IFNULL(ve_clave,'')='' THEN
	SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Password Nuevo Vacio.. Intentar nuevamente"}';
	LEAVE sp;
	END IF;

	SET vi_control=(SELECT COUNT(1) FROM usuario WHERE id=ve_usuario_id);

	IF vi_control=0 THEN
	SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Id Usuario No Existe.. Intentar nuevamente"}';
	LEAVE sp;
	END IF;


	-- Actualizamos Password el Registro Nuevo
	UPDATE usuario r SET r.contrasena=ve_clave
											,r.asignarclave=0
	WHERE r.id=ve_usuario_id;

	SET s_mensajeerror='{"codigo":0,"mensaje":"Password Actualizado Correctamente..."}';				

LEAVE sp;
END IF;

-- Bloque Creacion Usuario
IF vi_tipo='IN' THEN -- Crear Nuevos Usuario

IF IFNULL(ve_rol_id,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Rol Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


IF IFNULL(ve_apellidos,'')='' OR  IFNULL(ve_nombres,'')='' THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Apellidos y/o Nombres Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;

IF IFNULL(ve_email,'')='' OR  IFNULL(ve_login,'')='' OR IFNULL(ve_clave,'')='' THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Email y/o UserName y/o Password Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;



SET vi_control=(SELECT COUNT(1) FROM empresa WHERE id=ve_empresa_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Id Empresa no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM rol WHERE id=ve_rol_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Id Rol no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (username=ve_login) );
		  
IF vi_control>0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. UserName y/o Ya Existe para otro Usuario.. Intentar nuevamente"}';
LEAVE sp;
END IF;
			  
SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (correo=ve_email) );
		  
IF vi_control>0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Correo Electronico Ya Existe para otro Usuario.. Intentar nuevamente"}';
LEAVE sp;
END IF;
			  
-- Insertamos el Registro Nuevo
INSERT INTO usuario (nombres,apellidos,username,correo,contrasena,asignarclave,fechacreacion,rol_id,desactivado,empresa_id)
SELECT ve_nombres,ve_apellidos,ve_login,ve_email,MD5(ve_clave),0,UNIX_TIMESTAMP(SYSDATE()),ve_rol_id,1,ve_empresa_id;
				
		
SET s_mensajeerror='{"codigo":0,"mensaje":"Usuario Creado Correctamente..."}';

LEAVE sp;
END IF;


-- Bloque Actualizacion Datos Complementarios
IF vi_tipo='AC' THEN -- Crear Actualizacion

IF IFNULL(ve_nivelestudio_id,0)=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Nivel de Estudio Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


IF IFNULL(ve_apellidos,'')='' OR  IFNULL(ve_nombres,'')='' THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Apellidos y/o Nombres Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;

IF IFNULL(ve_email,'')='' OR  IFNULL(ve_celular,'')='' OR IFNULL(ve_descripcion,'')='' THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Email y/o Celular y/o Descripcion Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;

IF IFNULL(ve_perfil,'')='' OR  IFNULL(ve_fechanacimiento,'')=''  THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Perfil y/o Fecha Nacimiento Vacio.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM nivelestudio WHERE id=ve_nivelestudio_id);

IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Id Nivel Estudio no Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;


SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (id=ve_usuario_id) );
		  
IF vi_control=0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Id Usuario No Existe.. Intentar nuevamente"}';
LEAVE sp;
END IF;
			  
SET vi_control=(SELECT COUNT(1) FROM usuario WHERE (correo=ve_email) and id<>ve_usuario_id);
		  
IF vi_control>0 THEN
SET s_mensajeerror='{"codigo":1,"mensaje":"Error. Correo Electronico Ya Existe para otro Usuario.. Intentar nuevamente"}';
LEAVE sp;
END IF;
			  
	-- Actualizamos datos Complementarios
	UPDATE usuario r SET r.apellidos=ve_apellidos
											 ,r.nombres=ve_nombres
											 ,r.correo=ve_email
											 ,r.descripcion=ve_descripcion
											 ,r.perfil=ve_perfil
											 ,r.fechanacimiento=UNIX_TIMESTAMP(ve_fechanacimiento)
											 ,r.celular=ve_celular
											 ,r.nivelestudio_id=ve_nivelestudio_id
	WHERE r.id=ve_usuario_id;

	SET s_mensajeerror='{"codigo":0,"mensaje":"Informacion Actualizada Correctamente..."}';				
				


LEAVE sp;
END IF;




END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_area
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_area`;
delimiter ;;
CREATE PROCEDURE `sp_listar_area`(IN ve_area_id INT,IN ve_empresa_id INT)
BEGIN 
     
SELECT  r.id area_id
       ,r.nombre
			 ,r.empresa_id
			 ,e.nombre empresa
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,CONCAT(u.apellidos,' ',u.nombres) usuariocreado
FROM area r LEFT JOIN usuario u ON r.usuario_id=u.id
					  LEFT JOIN empresa e ON r.empresa_id=e.id
WHERE (r.id=ve_area_id OR ve_area_id=0)
AND (r.empresa_id=ve_empresa_id OR ve_empresa_id=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_empresa
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_empresa`;
delimiter ;;
CREATE PROCEDURE `sp_listar_empresa`(IN ve_empresa_id INT)
BEGIN 
     
SELECT  r.id empresa_id
       ,r.nombre
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,CONCAT(u.apellidos,' ',u.nombres) usuariocreado
FROM empresa r LEFT JOIN usuario u ON r.usuario_id=u.id
WHERE (r.id=ve_empresa_id OR ve_empresa_id=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_examen_pregunta
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_examen_pregunta`;
delimiter ;;
CREATE PROCEDURE `sp_listar_examen_pregunta`(IN ve_examen_id INT)
BEGIN 

-- Reporte Final
SELECT pr.id pregunta_id
			,pr.pregunta
			,pr.examen_id
FROM pregunta pr INNER JOIN examen ex ON pr.examen_id=ex.id
WHERE (pr.examen_id=ve_examen_id or ve_examen_id=0)
ORDER BY pr.id DESC;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_habilidad
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_habilidad`;
delimiter ;;
CREATE PROCEDURE `sp_listar_habilidad`(IN ve_habilidad_id INT)
BEGIN 
     
SELECT  r.id habilidad_id
       ,r.descripcion
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
FROM habilidad r LEFT JOIN usuario u ON r.usuario_id=u.id
WHERE (r.id=ve_habilidad_id OR ve_habilidad_id=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_linea
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_linea`;
delimiter ;;
CREATE PROCEDURE `sp_listar_linea`(IN ve_linea_id INT,IN ve_area_id INT, IN ve_empresa_id INT)
BEGIN 
     
SELECT  r.id linea_id
       ,r.nombre linea
			 ,a.id area_id
			 ,a.nombre area
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,CONCAT(u.apellidos,' ',u.nombres) usuariocreado
FROM linea r INNER JOIN area a ON r.area_id=a.id
					   LEFT JOIN usuario u ON r.usuario_id=u.id
WHERE (r.id=ve_linea_id OR ve_linea_id=0)
AND (a.id=ve_area_id OR ve_area_id=0)
AND a.empresa_id=ve_empresa_id;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_modulo_academy
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_modulo_academy`;
delimiter ;;
CREATE PROCEDURE `sp_listar_modulo_academy`(IN ve_idusuario INT)
BEGIN 
                                                                      
SELECT ma.id moduloacademy_id
		  ,ma.nombre moduloacademy
			,ma.ruta
			,FROM_UNIXTIME(ma.fechacreacion) fechacreacion
			,ma.tipomodulo_id
			,tp.nombre tipomodulo
			,ma.descripcion
			,ma.usuario_id
			,CONCAT(us.apellidos,' ',us.nombres) usuario
			,IFNULL(ma.examen_id,0) examen_id
			,ma.linea_id
			,ma.nombre linea
       ,CASE WHEN ma.eliminado='1' then 'INACTIVO' ELSE 'ACTIVO' END estado
       ,CASE WHEN ma.eliminado='1' THEN 'badge-pill bg-inactivo-tabla label' ELSE 'badge-pill bg-activo-tabla label' END clase
FROM moduloacademy ma INNER JOIN tipomodulo tp ON ma.tipomodulo_id=tp.id
									    INNER JOIN usuario us ON ma.usuario_id=us.id
											INNER JOIN linea li ON ma.linea_id=li.id
WHERE (ma.usuario_id=ve_idusuario or ve_idusuario=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_modulo_academy_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_modulo_academy_usuario`;
delimiter ;;
CREATE PROCEDURE `sp_listar_modulo_academy_usuario`(IN ve_idusuario INT)
BEGIN 

-- Evaluamos numero de intenos del examen
DROP TEMPORARY TABLE IF EXISTS tempointentos_examen;
CREATE TEMPORARY TABLE tempointentos_examen AS
SELECT examen_id,usuario_id,count(1) intentos
FROM respuesta_examen ua
WHERE (ua.usuario_id=ve_idusuario or ve_idusuario=0)
GROUP BY examen_id,usuario_id;

-- Reporte Final
SELECT ma.id moduloacademy_id
		  ,ma.nombre moduloacademy
			,ma.ruta
			,FROM_UNIXTIME(ua.fechacreacion) fechacreacion
			,FROM_UNIXTIME(ua.fechacalificacion) fechacalificacion
			,ma.tipomodulo_id
			,tp.nombre tipomodulo
			,ma.descripcion
			,ua.usuario_id
			,CONCAT(us.apellidos,' ',us.nombres) usuario
			,IFNULL(ma.examen_id,0) examen_id
			,IFNULL(ma.linea_id,0) linea_id
			,IFNULL(li.nombre,'General') linea
			,IFNULL(ix.intentos,0) intentos
			,IFNULL(ua.calificacion,0) calificacion
      ,CASE WHEN ua.calificacion IS NULL THEN 'POR CALIFICAR' ELSE 'CALIFICADO' END estado
      ,CASE WHEN ua.calificacion IS NULL THEN 1 ELSE 0 END clase
			,CASE WHEN IFNULL(ma.examen_id,0) =0 THEN 0
					  WHEN IFNULL(ix.intentos,0) >= 3 THEN 0 ELSE 1 END evaluacion
FROM usuario_moduloacademy ua INNER JOIN moduloacademy ma ON ua.moduloacademy_id=ma.id
														  INNER JOIN tipomodulo tp ON ma.tipomodulo_id=tp.id
															INNER JOIN usuario us ON ua.usuario_id=us.id
															LEFT JOIN linea li ON ma.linea_id=li.id
															LEFT JOIN tempointentos_examen ix ON ma.examen_id=ix.examen_id AND ua.usuario_id=ix.usuario_id
WHERE (ua.usuario_id=ve_idusuario or ve_idusuario=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_nivelestudio
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_nivelestudio`;
delimiter ;;
CREATE PROCEDURE `sp_listar_nivelestudio`(IN ve_nivelestudio_id INT)
BEGIN 
     
SELECT  r.id nivelestudio_id
       ,r.nivelestudio
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,CONCAT(u.apellidos,' ',u.nombres) usuariocreado
FROM nivelestudio r LEFT JOIN usuario u ON r.usuario_id=u.id
WHERE (r.id=ve_nivelestudio_id OR ve_nivelestudio_id=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_pregunta_opciones
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_pregunta_opciones`;
delimiter ;;
CREATE PROCEDURE `sp_listar_pregunta_opciones`(IN ve_pregunta_id INT)
BEGIN 

-- Reporte Final
SELECT op.id opciones_id
		  ,pr.id pregunta_id
			,op.respuesta opcion
			,op.bitCorrecta
FROM pregunta pr INNER JOIN opciones op ON pr.id=op.pregunta_id
WHERE (pr.id=ve_pregunta_id or ve_pregunta_id=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_rol
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_rol`;
delimiter ;;
CREATE PROCEDURE `sp_listar_rol`(IN ve_rol_id INT)
BEGIN 
     
SELECT  r.id rol_id
       ,r.nombre
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,CONCAT(u.apellidos,' ',u.nombres) usuariocreado
FROM rol r LEFT JOIN usuario u ON r.usuario_id=u.id
WHERE (r.id=ve_rol_id OR ve_rol_id=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_tipomodulo
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_tipomodulo`;
delimiter ;;
CREATE PROCEDURE `sp_listar_tipomodulo`(IN ve_tipomodulo_id INT)
BEGIN 
     
SELECT  r.id tipomodulo_id
       ,r.nombre
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,CONCAT(u.apellidos,' ',u.nombres) usuariocreado
FROM tipomodulo r LEFT JOIN usuario u ON r.usuario_id=u.id
WHERE (r.id=ve_tipomodulo_id OR ve_tipomodulo_id=0);

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_listar_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_listar_usuario`;
delimiter ;;
CREATE PROCEDURE `sp_listar_usuario`(IN ve_idusuario INT, IN ve_idusuario_padre INT)
BEGIN 
                                                                      
select CAST(r.id AS CHAR) as idusuario
       ,CAST(r.rol_id AS CHAR) as idrol
			 ,c.nombre rol
       ,r.apellidos
       ,r.nombres
			 ,r.alias
			 ,r.username
       ,FROM_UNIXTIME(r.fechaincorporacion) fechaincorporacion
       ,r.celular
       ,r.correo
       ,FROM_UNIXTIME(r.fechanacimiento)  fechanacimiento     
       ,FROM_UNIXTIME(r.fechacreacion) fechacreacion
       ,c.nombre rol
       ,CASE WHEN r.desactivado='1' then 'INACTIVO' ELSE 'ACTIVO' END estado
       ,CASE WHEN r.desactivado='1' THEN 'badge-pill bg-inactivo-tabla label' ELSE 'badge-pill bg-activo-tabla label' END clase
FROM usuario r LEFT JOIN rol c on r.rol_id=c.id
							 LEFT JOIN usuario_padre up ON r.id=up.id_usuario 
																					AND (up.usuario_id_padre=ve_idusuario_padre OR ve_idusuario_padre=0)

WHERE (r.id=ve_idusuario OR ve_idusuario=0);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_login_token
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_login_token`;
delimiter ;;
CREATE PROCEDURE `sp_login_token`(IN usersname VARCHAR(36), IN token VARCHAR(36), OUT s_mensajeerror TEXT(1000))
BEGIN 
     
 -- 1. se declaran variables locales para optimizacion                
 DECLARE vi_usersname VARCHAR(36);
 DECLARE vi_token VARCHAR(36);
               
 -- 2. Asignamos los valores recibidos                 
 SET vi_usersname=usersname;                 
 SET vi_token=token;
								 
SET s_mensajeerror=
(
	SELECT  CONCAT('{"codigo":',IF(u.id IS NULL,'0',u.id),','
				 ,'"mensaje":"',IF(u.id IS NULL,'Error. Token No Valido','Ok'),'"'
				 ,'}'
				 )
	FROM
	(
	SELECT vi_usersname usersname,vi_token token
	) ve LEFT JOIN usuario u ON u.username=ve.usersname AND u.token=ve.token
); 


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for sp_login_users
-- ----------------------------
DROP PROCEDURE IF EXISTS `sp_login_users`;
delimiter ;;
CREATE PROCEDURE `sp_login_users`(IN usersname VARCHAR(36), IN userspass VARCHAR(36), OUT s_mensajeerror TEXT(1000))
BEGIN 
     
 -- 1. se declaran variables locales para optimizacion                
 DECLARE vi_usersname VARCHAR(36);
 DECLARE vi_userspass VARCHAR(36);
               
 -- 2. Asignamos los valores recibidos                 
 SET vi_usersname=usersname;                 
 SET vi_userspass=userspass;                
SET s_mensajeerror=
(
SELECT  CONCAT('{"codigo":',IF(u.id IS NULL,'0',u.id),','
       ,'"usersid":',IF(IFNULL(u.desactivado,'1')='1','1',u.id),','
			 ,'"empresaid":',IF(IFNULL(u.desactivado,'1')='1','0',u.empresa_id),','
			 ,'"empresa":"',IF(u.id IS NULL,'0',IF(IFNULL(u.desactivado,'1')='1','N',r.nombre)),'",'
       ,'"rol":"',IF(u.id IS NULL,'0',IF(IFNULL(u.desactivado,'1')='1','N',rs.nombre)),'",'
			 ,'"rolid":',IF(u.id IS NULL,'0',IF(IFNULL(u.desactivado,'1')='1','N',rs.id)),','
       ,'"mail":"',IF(u.id IS NULL,'0',IF(IFNULL(u.desactivado,'1')='1','N',u.correo)),'",'
			 ,'"avatar":"',IF(u.id IS NULL,'0',IF(IFNULL(u.desactivado,'1')='1','N',IFNULL(u.perfil,''))),'",'
			 ,'"nombres":"',RTRIM(LTRIM(CONCAT(IFNULL(u.desactivado,'1'),' ',IFNULL(u.apellidos,'')))),'",'
       ,'"asignarclave":"',IF(u.id IS NULL,'0',IF(IFNULL(u.asignarclave,'S')='S','S','N')),'",'
       ,'"mensaje":"',IF(u.id IS NULL,'Error. Usuario y/o Password No Valido',IF(IFNULL(u.desactivado,'1')='1','Error. Usuario No se encuentra Activo','Ok')),'"'
       ,'}'
       )
FROM
(
SELECT vi_usersname usersname,vi_userspass userspass
) ve LEFT JOIN usuario u ON u.username=ve.usersname AND u.contrasena=MD5(ve.userspass)
     LEFT JOIN rol rs ON u.rol_id=rs.id
		 LEFT JOIN empresa r ON u.empresa_id=r.id);   


END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
