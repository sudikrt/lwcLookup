public with sharing class LookupSearchResult implements Comparable{
    private Id id;
    private String sObjectType;
    private String icon;
    private String title;
    private String subtitle;

    public LookupSearchResult(Id id, String sObjectType, String icon, String title, String subTitle) {
        this.id = id;
        this.sObjectType = sObjectType;
        this.icon = icon;
        this.title = title;
        this.subtitle = subtitle;
    }

    @AuraEnabled
    public Id getId(){
        return this.id;
    }
    @AuraEnabled
    public String getSobjectType () {
        return this.sObjectType;
    }
    @AuraEnabled
    public String getIcon () {
        return this.icon;
    }
    @AuraEnabled
    public String getTitle () {
        return this.title;
    }
    @AuraEnabled
    public String getSubtitle ()  {
        return this.subtitle;
    }

    public Integer compareTo (Object compareTo) {
        LookupSearchResult other = (LookupSearchResult) compareTo;
        if (this.getTitle() == null) {
            return (other.getTitle() == null) ? 0 : 1;
        }
        if (other.getTitle() == null) {
            return -1;
        }
        return this.getTitle().compareTo(other.getTitle());
    }
}
