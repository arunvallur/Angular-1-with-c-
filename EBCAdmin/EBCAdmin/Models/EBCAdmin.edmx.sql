
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 09/22/2016 14:10:36
-- Generated from EDMX file: D:\Projects\EBCAdmin\EBCAdmin\Models\EBCAdmin.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [EBCAdmin];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------


-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Asset_bill_tbl'
CREATE TABLE [dbo].[Asset_bill_tbl] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [AssetName] varchar(100)  NULL,
    [AssetImage] varchar(120)  NULL,
    [Remarks] varchar(500)  NULL,
    [AssetAmount] decimal(18,2)  NULL,
    [AssetDate] datetime  NULL
);
GO

-- Creating table 'bookings'
CREATE TABLE [dbo].[bookings] (
    [id] bigint IDENTITY(1,1) NOT NULL,
    [user_id] bigint  NOT NULL,
    [cour_id] bigint  NOT NULL,
    [slot_id] bigint  NOT NULL,
    [booking_date] datetime  NOT NULL,
    [booking_status] varchar(50)  NULL,
    [booking_price] decimal(10,6)  NOT NULL,
    [Booking_expdate] datetime  NOT NULL,
    [UserType] int  NULL
);
GO

-- Creating table 'booking_history'
CREATE TABLE [dbo].[booking_history] (
    [id] bigint  NOT NULL,
    [booking_id] bigint  NOT NULL,
    [booking_start_date] datetime  NOT NULL,
    [booking_end_date] datetime  NOT NULL
);
GO

-- Creating table 'courts'
CREATE TABLE [dbo].[courts] (
    [id] bigint  NOT NULL,
    [court_number] bigint  NOT NULL,
    [location] varchar(250)  NULL
);
GO

-- Creating table 'members'
CREATE TABLE [dbo].[members] (
    [id] bigint IDENTITY(1,1) NOT NULL,
    [UserType] int  NOT NULL,
    [name] varchar(120)  NOT NULL,
    [password] varchar(100)  NULL,
    [mobile] varchar(12)  NOT NULL,
    [Email] varchar(150)  NOT NULL,
    [expiry_date] datetime  NULL,
    [reg_Date] datetime  NULL,
    [Address] varchar(250)  NOT NULL,
    [Amount] decimal(18,2)  NULL,
    [MEstatus] varchar(12)  NULL,
    [Slot] int  NULL,
    [Court] int  NULL
);
GO

-- Creating table 'Prices'
CREATE TABLE [dbo].[Prices] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [C3M] decimal(18,2)  NOT NULL,
    [C6M] decimal(18,2)  NOT NULL,
    [C1D] decimal(18,2)  NOT NULL,
    [TaxPercent] decimal(18,2)  NOT NULL,
    [Type] int  NOT NULL
);
GO

-- Creating table 'slots'
CREATE TABLE [dbo].[slots] (
    [id] bigint IDENTITY(1,1) NOT NULL,
    [start_time] time  NOT NULL,
    [end_time] time  NOT NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'tblregisters'
CREATE TABLE [dbo].[tblregisters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(120)  NULL,
    [Email] varchar(120)  NULL,
    [Mobile] nvarchar(10)  NULL,
    [Address] varchar(250)  NULL,
    [Password] varchar(150)  NULL,
    [UserType] nvarchar(10)  NULL
);
GO

-- Creating table 'UserTypes'
CREATE TABLE [dbo].[UserTypes] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [UserTypeName] varchar(50)  NULL,
    [UserType1] int  NULL
);
GO

-- Creating table 'Wallets'
CREATE TABLE [dbo].[Wallets] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [BookedDate] datetime  NULL,
    [CreditTotal] decimal(18,2)  NULL,
    [CreditUsed] decimal(18,2)  NULL,
    [BookingID] bigint  NOT NULL,
    [MemberID] bigint  NOT NULL
);
GO

-- Creating table 'users'
CREATE TABLE [dbo].[users] (
    [id] bigint  NOT NULL,
    [first_name] varchar(50)  NOT NULL,
    [last_name] varchar(50)  NOT NULL,
    [email_id] varchar(50)  NOT NULL,
    [phone_no] bigint  NULL,
    [role_id] bigint  NOT NULL,
    [password] varchar(200)  NOT NULL,
    [status] smallint  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [ID] in table 'Asset_bill_tbl'
ALTER TABLE [dbo].[Asset_bill_tbl]
ADD CONSTRAINT [PK_Asset_bill_tbl]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [id] in table 'bookings'
ALTER TABLE [dbo].[bookings]
ADD CONSTRAINT [PK_bookings]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'booking_history'
ALTER TABLE [dbo].[booking_history]
ADD CONSTRAINT [PK_booking_history]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'courts'
ALTER TABLE [dbo].[courts]
ADD CONSTRAINT [PK_courts]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'members'
ALTER TABLE [dbo].[members]
ADD CONSTRAINT [PK_members]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [Id] in table 'Prices'
ALTER TABLE [dbo].[Prices]
ADD CONSTRAINT [PK_Prices]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [id] in table 'slots'
ALTER TABLE [dbo].[slots]
ADD CONSTRAINT [PK_slots]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [ID] in table 'tblregisters'
ALTER TABLE [dbo].[tblregisters]
ADD CONSTRAINT [PK_tblregisters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'UserTypes'
ALTER TABLE [dbo].[UserTypes]
ADD CONSTRAINT [PK_UserTypes]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'Wallets'
ALTER TABLE [dbo].[Wallets]
ADD CONSTRAINT [PK_Wallets]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [id] in table 'users'
ALTER TABLE [dbo].[users]
ADD CONSTRAINT [PK_users]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [cour_id] in table 'bookings'
ALTER TABLE [dbo].[bookings]
ADD CONSTRAINT [FK_booking_courts]
    FOREIGN KEY ([cour_id])
    REFERENCES [dbo].[courts]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_booking_courts'
CREATE INDEX [IX_FK_booking_courts]
ON [dbo].[bookings]
    ([cour_id]);
GO

-- Creating foreign key on [user_id] in table 'bookings'
ALTER TABLE [dbo].[bookings]
ADD CONSTRAINT [FK_booking_members]
    FOREIGN KEY ([user_id])
    REFERENCES [dbo].[members]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_booking_members'
CREATE INDEX [IX_FK_booking_members]
ON [dbo].[bookings]
    ([user_id]);
GO

-- Creating foreign key on [slot_id] in table 'bookings'
ALTER TABLE [dbo].[bookings]
ADD CONSTRAINT [FK_booking_slots]
    FOREIGN KEY ([slot_id])
    REFERENCES [dbo].[slots]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_booking_slots'
CREATE INDEX [IX_FK_booking_slots]
ON [dbo].[bookings]
    ([slot_id]);
GO

-- Creating foreign key on [BookingID] in table 'Wallets'
ALTER TABLE [dbo].[Wallets]
ADD CONSTRAINT [FK_Wallet_Booking]
    FOREIGN KEY ([BookingID])
    REFERENCES [dbo].[bookings]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Wallet_Booking'
CREATE INDEX [IX_FK_Wallet_Booking]
ON [dbo].[Wallets]
    ([BookingID]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------